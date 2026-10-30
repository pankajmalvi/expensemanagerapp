import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app

# Create in-memory SQLite database for isolated tests
TEST_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# Enforce foreign keys in test SQLite
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(autouse=True)
def setup_database():
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

# ----------------- Category Tests -----------------

def test_add_category_success():
    response = client.post("/categories", json={"name": "Food"})
    assert response.status_code == 201
    data = response.json()
    assert data["id"] == 1
    assert data["name"] == "Food"

def test_add_category_trimmed():
    response = client.post("/categories", json={"name": "  Health & Wellness  "})
    assert response.status_code == 201
    assert response.json()["name"] == "Health & Wellness"

def test_add_category_single_char():
    response = client.post("/categories", json={"name": "X"})
    assert response.status_code == 201
    assert response.json()["name"] == "X"

def test_add_duplicate_category_exact():
    client.post("/categories", json={"name": "Food"})
    response = client.post("/categories", json={"name": "Food"})
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"]

def test_add_duplicate_category_case_insensitive():
    client.post("/categories", json={"name": "Food"})
    response = client.post("/categories", json={"name": "food"})
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"]

def test_add_duplicate_category_whitespace():
    client.post("/categories", json={"name": "Food"})
    response = client.post("/categories", json={"name": "  FOOD  "})
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"]

def test_add_category_empty_name():
    response = client.post("/categories", json={"name": ""})
    assert response.status_code == 422

def test_add_category_whitespace_name():
    response = client.post("/categories", json={"name": "   "})
    assert response.status_code == 422

def test_add_category_newlines_only():
    response = client.post("/categories", json={"name": "\n\t  \r"})
    assert response.status_code == 422

def test_list_categories_with_counts():
    client.post("/categories", json={"name": "Food"})
    client.post("/categories", json={"name": "Utilities"})
    
    response = client.get("/categories")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["name"] == "Food"
    assert data[0]["total_expenses"] == 0
    assert data[1]["name"] == "Utilities"
    assert data[1]["total_expenses"] == 0

# ----------------- Expense Tests -----------------

def test_add_expense_success():
    cat_res = client.post("/categories", json={"name": "Food"})
    cat_id = cat_res.json()["id"]

    response = client.post("/expenses", json={
        "title": "Lunch",
        "amount": 250.50,
        "category_id": cat_id
    })
    assert response.status_code == 201
    data = response.json()
    assert data["id"] == 1
    assert data["title"] == "Lunch"
    assert data["amount"] == 250.50
    assert data["category_id"] == cat_id
    assert "created_at" in data

def test_add_expense_with_special_characters():
    cat_res = client.post("/categories", json={"name": "Work"})
    cat_id = cat_res.json()["id"]

    response = client.post("/expenses", json={
        "title": "Office Supplies & Notebooks (Q1 - 2026) #12",
        "amount": 89.95,
        "category_id": cat_id
    })
    assert response.status_code == 201
    assert response.json()["title"] == "Office Supplies & Notebooks (Q1 - 2026) #12"

def test_add_expense_rounds_amount():
    cat_res = client.post("/categories", json={"name": "Food"})
    cat_id = cat_res.json()["id"]

    response = client.post("/expenses", json={
        "title": "Dinner with tax",
        "amount": 49.999,
        "category_id": cat_id
    })
    assert response.status_code == 201
    assert response.json()["amount"] == 50.0

def test_add_expense_large_amount():
    cat_res = client.post("/categories", json={"name": "Real Estate"})
    cat_id = cat_res.json()["id"]

    response = client.post("/expenses", json={
        "title": "Office Lease Deposit",
        "amount": 1000000.50,
        "category_id": cat_id
    })
    assert response.status_code == 201
    assert response.json()["amount"] == 1000000.50

def test_add_expense_nonexistent_category_constraint_1():
    # Constraint 1: Category must exist before creating expense
    response = client.post("/expenses", json={
        "title": "Lunch",
        "amount": 150.0,
        "category_id": 9999
    })
    assert response.status_code == 400
    assert "Category with id 9999 does not exist" in response.json()["detail"]

def test_add_expense_empty_title_constraint_2():
    cat_res = client.post("/categories", json={"name": "Food"})
    cat_id = cat_res.json()["id"]

    # Empty string
    response = client.post("/expenses", json={
        "title": "",
        "amount": 100.0,
        "category_id": cat_id
    })
    assert response.status_code == 422

    # Whitespace only
    response2 = client.post("/expenses", json={
        "title": "    ",
        "amount": 100.0,
        "category_id": cat_id
    })
    assert response2.status_code == 422

    # Newlines/tabs only
    response3 = client.post("/expenses", json={
        "title": "\n\t  ",
        "amount": 100.0,
        "category_id": cat_id
    })
    assert response3.status_code == 422

def test_add_expense_invalid_amount_constraint_3():
    cat_res = client.post("/categories", json={"name": "Food"})
    cat_id = cat_res.json()["id"]

    # Zero amount
    res_zero = client.post("/expenses", json={
        "title": "Free Item",
        "amount": 0,
        "category_id": cat_id
    })
    assert res_zero.status_code == 422

    # Negative amount
    res_neg = client.post("/expenses", json={
        "title": "Refund",
        "amount": -50.25,
        "category_id": cat_id
    })
    assert res_neg.status_code == 422

    # String amount
    res_str = client.post("/expenses", json={
        "title": "Refund",
        "amount": "not-a-number",
        "category_id": cat_id
    })
    assert res_str.status_code == 422

def test_add_expense_invalid_category_id_type():
    res = client.post("/expenses", json={
        "title": "Snacks",
        "amount": 10.0,
        "category_id": "invalid-id"
    })
    assert res.status_code == 422

def test_fetch_expenses_with_joined_category():
    client.post("/categories", json={"name": "Food"})
    client.post("/expenses", json={"title": "Lunch", "amount": 250.50, "category_id": 1})
    client.post("/expenses", json={"title": "Coffee", "amount": 45.00, "category_id": 1})

    response = client.get("/expenses")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    # Ordered DESC by created_at / id
    assert data[0]["title"] == "Coffee"
    assert data[0]["amount"] == 45.00
    assert data[0]["category"] == "Food"
    assert data[1]["title"] == "Lunch"
    assert data[1]["category"] == "Food"

def test_category_total_expenses_updates():
    client.post("/categories", json={"name": "Food"})
    client.post("/categories", json={"name": "Transport"})

    client.post("/expenses", json={"title": "Lunch", "amount": 250.5, "category_id": 1})
    client.post("/expenses", json={"title": "Dinner", "amount": 180.0, "category_id": 1})
    client.post("/expenses", json={"title": "Bus", "amount": 20.0, "category_id": 2})

    response = client.get("/categories")
    assert response.status_code == 200
    cats = {c["name"]: c["total_expenses"] for c in response.json()}
    assert cats["Food"] == 2
    assert cats["Transport"] == 1

# ----------------- Summary Tests -----------------

def test_summary_empty_state_division_by_zero():
    response = client.get("/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0.0
    assert data["count"] == 0
    assert data["average"] == 0.0

def test_summary_calculation_matches_prd_example():
    client.post("/categories", json={"name": "Food"})
    client.post("/expenses", json={"title": "Lunch", "amount": 250.5, "category_id": 1})
    client.post("/expenses", json={"title": "Dinner", "amount": 180.0, "category_id": 1})

    response = client.get("/summary")
    assert response.status_code == 200
    data = response.json()
    # 250.5 + 180.0 = 430.5
    assert data["total"] == 430.5
    assert data["count"] == 2
    # 430.5 / 2 = 215.25
    assert data["average"] == 215.25

def test_multiple_categories_and_expenses_edge_summary():
    # 3 categories, multiple expenses, verifying average precision
    client.post("/categories", json={"name": "Groceries"})
    client.post("/categories", json={"name": "Entertainment"})
    client.post("/categories", json={"name": "Bills"})

    client.post("/expenses", json={"title": "Supermarket", "amount": 100.10, "category_id": 1})
    client.post("/expenses", json={"title": "Cinema", "amount": 25.40, "category_id": 2})
    client.post("/expenses", json={"title": "Electricity", "amount": 74.50, "category_id": 3})

    summ_res = client.get("/summary")
    assert summ_res.status_code == 200
    summ = summ_res.json()
    # Total: 100.10 + 25.40 + 74.50 = 200.00
    assert summ["total"] == 200.0
    assert summ["count"] == 3
    # Average: 200 / 3 = 66.67
    assert summ["average"] == 66.67
