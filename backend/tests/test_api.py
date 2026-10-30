import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base, get_db

# Use an in-memory SQLite database for test isolation
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# Enforce foreign key constraints
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


# -----------------------------------------------------------------------------
# Health Check Tests
# -----------------------------------------------------------------------------
def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


# -----------------------------------------------------------------------------
# Category Management Tests
# -----------------------------------------------------------------------------
def test_create_category_success():
    response = client.post("/categories", json={"name": "Food"})
    assert response.status_code == 201
    data = response.json()
    assert data["id"] == 1
    assert data["name"] == "Food"


def test_create_category_whitespace_trimmed():
    response = client.post("/categories", json={"name": "  Utilities  "})
    assert response.status_code == 201
    assert response.json()["name"] == "Utilities"


def test_create_category_empty_name_rejected():
    # Empty string
    response = client.post("/categories", json={"name": ""})
    assert response.status_code == 422

    # Whitespace only
    response = client.post("/categories", json={"name": "   "})
    assert response.status_code == 422


def test_create_category_duplicate_rejected():
    # First creation
    res1 = client.post("/categories", json={"name": "Food"})
    assert res1.status_code == 201

    # Exact duplicate
    res2 = client.post("/categories", json={"name": "Food"})
    assert res2.status_code == 409
    assert "already exists" in res2.json()["detail"]

    # Case-insensitive duplicate
    res3 = client.post("/categories", json={"name": "food"})
    assert res3.status_code == 409
    assert "already exists" in res3.json()["detail"]

    # Whitespace + case duplicate
    res4 = client.post("/categories", json={"name": "  FOOD  "})
    assert res4.status_code == 409
    assert "already exists" in res4.json()["detail"]


def test_list_categories_with_count():
    # Create 2 categories
    client.post("/categories", json={"name": "Food"})
    client.post("/categories", json={"name": "Travel"})

    response = client.get("/categories")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] == "Food"
    assert data[0]["total_expenses"] == 0
    assert data[1]["name"] == "Travel"
    assert data[1]["total_expenses"] == 0


# -----------------------------------------------------------------------------
# Expense Creation & Constraint Tests
# -----------------------------------------------------------------------------
def test_create_expense_success():
    client.post("/categories", json={"name": "Food"})

    payload = {
        "title": "Lunch",
        "amount": 250.5,
        "category_id": 1
    }
    response = client.post("/expenses", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] == 1
    assert data["title"] == "Lunch"
    assert data["amount"] == 250.5
    assert data["category_id"] == 1
    assert "created_at" in data


def test_constraint_1_category_must_exist():
    # Non-existent category ID
    payload = {
        "title": "Dinner",
        "amount": 120.0,
        "category_id": 999
    }
    response = client.post("/expenses", json=payload)
    assert response.status_code == 400
    assert "does not exist" in response.json()["detail"]


def test_constraint_2_title_cannot_be_empty():
    client.post("/categories", json={"name": "Food"})

    # Empty title
    res1 = client.post("/expenses", json={"title": "", "amount": 50.0, "category_id": 1})
    assert res1.status_code == 422

    # Whitespace-only title
    res2 = client.post("/expenses", json={"title": "   ", "amount": 50.0, "category_id": 1})
    assert res2.status_code == 422


def test_constraint_3_amount_must_be_positive():
    client.post("/categories", json={"name": "Food"})

    # Zero amount
    res1 = client.post("/expenses", json={"title": "Coffee", "amount": 0, "category_id": 1})
    assert res1.status_code == 422

    # Negative amount
    res2 = client.post("/expenses", json={"title": "Refund", "amount": -25.0, "category_id": 1})
    assert res2.status_code == 422

    # Strictly positive amount (cents)
    res3 = client.post("/expenses", json={"title": "Gum", "amount": 0.99, "category_id": 1})
    assert res3.status_code == 201


# -----------------------------------------------------------------------------
# Fetch Expenses & Joined Category Tests
# -----------------------------------------------------------------------------
def test_fetch_expenses_list():
    client.post("/categories", json={"name": "Food"})
    client.post("/expenses", json={"title": "Lunch", "amount": 250.5, "category_id": 1})

    response = client.get("/expenses")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Lunch"
    assert data[0]["amount"] == 250.5
    assert data[0]["category"] == "Food"
    assert "created_at" in data[0]


# -----------------------------------------------------------------------------
# Summary Calculation Tests (Overall Statistics & Edge Cases)
# -----------------------------------------------------------------------------
def test_summary_empty_state_zero_division():
    # When no expenses exist, should return 0.0 without division by zero
    response = client.get("/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0.0
    assert data["count"] == 0
    assert data["average"] == 0.0


def test_summary_calculation_matches_prd_example():
    # PRD Example:
    # Expense 1: 250.5
    # Expense 2: 180.0
    # Total: 430.5, Count: 2, Average: 215.25
    client.post("/categories", json={"name": "Food"})
    client.post("/expenses", json={"title": "Lunch", "amount": 250.5, "category_id": 1})
    client.post("/expenses", json={"title": "Snacks", "amount": 180.0, "category_id": 1})

    response = client.get("/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 430.5
    assert data["count"] == 2
    assert data["average"] == 215.25


def test_category_summary_updates_counts():
    client.post("/categories", json={"name": "Food"})
    client.post("/categories", json={"name": "Tech"})

    # 3 expenses for Food, 0 for Tech
    client.post("/expenses", json={"title": "Breakfast", "amount": 50.0, "category_id": 1})
    client.post("/expenses", json={"title": "Lunch", "amount": 100.0, "category_id": 1})
    client.post("/expenses", json={"title": "Dinner", "amount": 150.0, "category_id": 1})

    response = client.get("/categories")
    assert response.status_code == 200
    data = response.json()
    cat_food = next(c for c in data if c["name"] == "Food")
    cat_tech = next(c for c in data if c["name"] == "Tech")

    assert cat_food["total_expenses"] == 3
    assert cat_tech["total_expenses"] == 0
