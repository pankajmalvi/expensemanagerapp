# Project Constraints & Validation Rules

These rules enforce the mandatory requirements and constraints specified in `Interview_Task_Expense_Tracker 1.pdf`.

## 1. Mandatory Business Constraints

1. **Category Existence**:
   - An expense MUST be linked to an existing, valid category.
   - Enforce SQLite foreign keys (`PRAGMA foreign_keys = ON;`).
   - If a non-existent `category_id` is supplied to `POST /expenses`, reject with `400 Bad Request` or `404 Not Found` with a clear error payload.
   - On the frontend, disable the expense creation form if no categories exist, prompting the user to create one first.

2. **Title Non-Empty**:
   - Expense title MUST NOT be empty or contain only whitespace.
   - Both client and server must strip/trim whitespace before validating.
   - Server returns `400 Bad Request` if `len(title.strip()) == 0`.

3. **Amount Must Be Positive**:
   - Expense amount MUST be strictly greater than zero (`amount > 0`).
   - Reject zero, negative numbers, or non-numeric inputs on both frontend and backend.
   - Store and compute amounts with 2-decimal precision.

4. **Category Name Uniqueness**:
   - Duplicate category names MUST be avoided.
   - Uniqueness check must be case-insensitive (e.g., `"Food"` and `"food"` are treated as duplicates) and whitespace-trimmed.
   - Server returns `409 Conflict` (or `400 Bad Request`) if a duplicate is attempted.

5. **Graceful Error Handling**:
   - All invalid inputs, API failures, or network issues must display human-readable, non-crashing UI feedback.
   - Backend must return structured error responses (`{"detail": "..."}`) with appropriate HTTP status codes (400, 404, 409, 422).

6. **Scope Discipline (Zero Over-Engineering)**:
   - Stay strictly within the requirements outlined in `SPEC.md` and the PRD.
   - Do NOT introduce authentication, user sessions, complex permissions, external billing services, pagination, or multi-currency conversions unless explicitly requested by the user.
