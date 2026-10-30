# Technical Specification: Expense Manager Application

**Tech Stack**: Next.js (Frontend) + FastAPI (Backend) + SQLite (Database)  
**Document Ref**: Full Stack Developer Hiring Challenge (`Interview_Task_Expense_Tracker 1.pdf`)  
**Design Principle**: Strictly aligned with project specifications; zero over-engineering; clean and robust architecture.

---

## 1. Scope & System Boundaries

### In Scope (Mandatory per PRD)
1. **Category Management**:
   - Create new category (`POST /categories`).
   - List categories with total expense count per category (`GET /categories`).
   - Duplicate category name prevention (case-insensitive + trimmed).
2. **Expense Management**:
   - Create new expense linked to existing category (`POST /expenses`).
   - Required fields: title, amount, category_id, timestamp.
   - List expenses with joined category name and created_at (`GET /expenses`).
3. **Summary & Analytics**:
   - Overall statistics endpoint (`GET /summary`) returning total amount, total count, and average expense amount.
4. **Relational Database Design**:
   - SQLite tables: `categories` and `expenses` with foreign key relationship (`expenses.category_id -> categories.id`).
5. **Frontend Application**:
   - Next.js single-page application with responsive UI.
   - 4 primary sections: Category Section, Expense Form, Summary Cards, Expense List.
   - Immediate reactive state refresh on any mutation (adding category or expense).
   - Strict validation feedback (positive amount, non-empty title, mandatory category).

### Explicitly Out of Scope (Avoiding Over-Engineering)
- User authentication, login, or multi-tenancy.
- Complex multi-currency conversion or rate lookups.
- Complex chart libraries / heavy visualization widgets (unless simple CSS progress bars).
- Pagination, infinite scrolling, or full-text search (document targets 30-min challenge scale).
- Category deletion / cascading delete edge handling (not in PRD endpoints, though soft validation will be maintained).

---

## 2. Identified Document Gaps, Open Questions & Decisions

| # | PRD Ambiguity / Gap | Impact | Locked-in Decision & Default |
|---|---|---|---|
| **1** | PRD states *"The system should support core CRUD operations"*, but detailed requirements only specify `POST` and `GET` for categories & expenses. | Potential scope creep if PUT/DELETE are expected. | **Lock strictly to specified endpoints**: `POST /categories`, `GET /categories`, `POST /expenses`, `GET /expenses`, `GET /summary`. Optionally implement a clean `DELETE /expenses/{id}` on the backend without cluttering frontend unless required. |
| **2** | `GET /summary` behavior when 0 expenses exist (division by zero). | Server crash (ZeroDivisionError) or NaN in frontend. | When `count == 0`: return `{"total": 0.0, "count": 0, "average": 0.0}` with HTTP 200. |
| **3** | Category duplicate check sensitivity (`"Food"` vs `"food "` vs `"FOOD"`). | Dirty or duplicate category lists. | Normalize name by trimming leading/trailing whitespace and check case-insensitively (`LOWER(name)`). Return `400 Bad Request` or `409 Conflict` with clear error message `Category '<name>' already exists.`. |
| **4** | Foreign Key enforcement in SQLite. | SQLite disables FK constraints by default unless explicitly turned on. | Enable `PRAGMA foreign_keys = ON;` on every DB connection. Backend validates category existence and returns `400 Bad Request` with `"Category with id <id> does not exist."`. |
| **5** | Timestamp generation for expense creation. | Inconsistent client clocks if supplied by frontend. | Generated server-side using UTC ISO 8601 timestamp (`datetime.utcnow().isoformat()`) at insertion time. |
| **6** | Expense amount type & bounds. | Negative or 0 values, floating-point precision issues. | Validate `amount > 0`. Store as `NUMERIC` / `REAL` in SQLite, rounded to 2 decimal places in calculations. |
| **7** | Category list for Expense Form dropdown. | Dropdown needs category ID and Name. | Use `GET /categories` which already provides `id`, `name`, and `total_expenses`. |

---

## 3. Data Models & Database Schema

### 3.1 SQLite Relational Schema

```sql
-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- Table 1: categories
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE COLLATE NOCASE
);

-- Table 2: expenses
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    category_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);
```

### 3.2 SQLAlchemy Models (`backend/app/models.py`)

```python
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, unique=True, index=True, nullable=False)

    expenses = relationship("Expense", back_populates="category")

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    amount = Column(Numeric(precision=10, scale=2), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    category = relationship("Category", back_populates="expenses")
```

---

## 4. API Contracts & Specifications

Base URL: `http://localhost:8000`  
CORS: Allowed origins `["http://localhost:3000"]`

### 4.1 Category Endpoints

#### `POST /categories`
Create a new category.

- **Request Body**:
  ```json
  {
    "name": "Food"
  }
  ```
- **Validation**:
  - `name`: String, trimmed, min_length = 1, max_length = 50.
- **Success Response (`201 Created` or `200 OK`)**:
  ```json
  {
    "id": 1,
    "name": "Food"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{"detail": "Category name cannot be empty."}`
  - `409 Conflict`: `{"detail": "Category 'Food' already exists."}`

---

#### `GET /categories`
Fetch all categories with associated expense counts.

- **Request**: No query parameters required.
- **Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": 1,
      "name": "Food",
      "total_expenses": 3
    },
    {
      "id": 2,
      "name": "Utilities",
      "total_expenses": 0
    }
  ]
  ```

---

### 4.2 Expense Endpoints

#### `POST /expenses`
Create a new expense entry linked to a category.

- **Request Body**:
  ```json
  {
    "title": "Lunch",
    "amount": 250.5,
    "category_id": 1
  }
  ```
- **Validation**:
  - `title`: String, trimmed, non-empty.
  - `amount`: Float/Numeric, strictly positive (`> 0`).
  - `category_id`: Integer, must match an existing category ID.
- **Success Response (`201 Created` or `200 OK`)**:
  ```json
  {
    "id": 1,
    "title": "Lunch",
    "amount": 250.5,
    "category_id": 1,
    "created_at": "2026-04-14T12:00:00"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: `{"detail": "Amount must be greater than zero."}` or `{"detail": "Title cannot be empty."}`
  - `404 Not Found`: `{"detail": "Category with ID 1 does not exist."}`

---

#### `GET /expenses`
Fetch all recorded expenses sorted by `created_at DESC`.

- **Success Response (`200 OK`)**:
  ```json
  [
    {
      "id": 1,
      "title": "Lunch",
      "amount": 250.5,
      "category": "Food",
      "created_at": "2026-04-14T12:00:00"
    }
  ]
  ```

---

### 4.3 Summary Endpoint

#### `GET /summary`
Compute overall statistics across all expenses.

- **Success Response (`200 OK`)**:
  ```json
  {
    "total": 430.5,
    "count": 2,
    "average": 215.25
  }
  ```
- **Empty State Response (when count is 0)**:
  ```json
  {
    "total": 0.0,
    "count": 0,
    "average": 0.0
  }
  ```

---

## 5. Core User Flows & Edge-Case Handling

```
+-------------------------------------------------------------+
|                      User Application                       |
+-------------------------------------------------------------+
        |                                        |
  Create Category                          Add Expense
        v                                        v
[Validate Name Non-Empty]                [Validate Category Exists]
        v                                        v
[Check Duplicate]                        [Validate Amount > 0 & Title]
        v                                        v
[POST /categories]                       [POST /expenses]
        |                                        |
        +-------------------+--------------------+
                            |
                            v
               Trigger Unified Refresh:
               - Refetch GET /categories
               - Refetch GET /expenses
               - Refetch GET /summary
```

### Key Edge Cases & Handlers
1. **Adding expense when no categories exist**:
   - The category dropdown shows a disabled prompt: *"No categories found. Please create a category first."*
   - Submit button is disabled until at least one category is created and selected.
2. **Submitting empty or whitespace-only names/titles**:
   - Frontend HTML5 / React state validation prevents empty submissions.
   - Backend Pydantic schema validator trims strings and rejects empty strings with `400 Bad Request`.
3. **Submitting zero, negative, or invalid numeric amounts**:
   - Amount input has `min="0.01"` and `step="0.01"`.
   - Backend validates `gt=0`.
4. **Backend Unavailable / Connection Errors**:
   - Frontend displays clear toast or error banner: *"Unable to connect to backend server. Please verify FastAPI is running on port 8000."*

---

## 6. Frontend Architecture & UI Layout

Single-page dashboard layout built with **Next.js (App Router)** and styled with **Tailwind CSS**:

```
+------------------------------------------------------------------------+
|                          Expense Manager                               |
+------------------------------------------------------------------------+
|  [Summary Cards: Total Expense ($) | Total Count | Average Expense ($)]|
+------------------------------------+-----------------------------------+
|  [Category Section]                |  [Expense Form]                   |
|  - Input: New Category Name        |  - Input: Expense Title           |
|  - Button: "Add Category"          |  - Input: Amount ($)              |
|  - Category list with badges       |  - Dropdown: Select Category      |
|    e.g. "Food (3)"                 |  - Button: "Add Expense"          |
+------------------------------------+-----------------------------------+
|  [Expense List Table / Stream]                                         |
|  - Columns: Date | Title | Category | Amount                           |
|  - Empty state when 0 records exist                                    |
+------------------------------------------------------------------------+
```

---

## 7. Directory Structure

```
ExpenseManagerApp/
├── SPEC.md                             # This comprehensive specification document
├── Interview_Task_Expense_Tracker 1.pdf # PRD from prompt
│
├── backend/                            # FastAPI Application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                     # FastAPI entrypoint & CORS config
│   │   ├── database.py                 # SQLite connection & session management
│   │   ├── models.py                   # SQLAlchemy ORM models (Category, Expense)
│   │   ├── schemas.py                  # Pydantic schemas (request/response)
│   │   ├── crud.py                     # Database query logic
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── categories.py           # /categories routes
│   │       ├── expenses.py             # /expenses routes
│   │       └── summary.py              # /summary route
│   ├── requirements.txt                # fastapi, uvicorn, sqlalchemy, pydantic
│   └── README.md
│
└── frontend/                           # Next.js Application
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx              # Root HTML wrapper and metadata
    │   │   ├── page.tsx                # Main dashboard page aggregating components
    │   │   └── globals.css             # Tailwind CSS & global styling
    │   ├── components/
    │   │   ├── SummaryCards.tsx        # Total, Count, Average metrics display
    │   │   ├── CategorySection.tsx     # Add category form & active categories list
    │   │   ├── ExpenseForm.tsx         # Add expense form with category select
    │   │   └── ExpenseList.tsx         # Formatted table of recorded expenses
    │   └── lib/
    │       ├── api.ts                  # Fetch client for all backend endpoints
    │       └── types.ts                # TypeScript interfaces matching backend schemas
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    └── README.md
```

