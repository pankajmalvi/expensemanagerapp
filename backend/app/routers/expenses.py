from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post(
    "",
    response_model=schemas.ExpenseCreateOut,
    status_code=status.HTTP_201_CREATED,
    summary="Add a new expense"
)
def create_expense(
    expense_in: schemas.ExpenseCreate,
    db: Session = Depends(get_db)
):
    # Constraint 1: Category must exist before creating expense
    category = crud.get_category_by_id(db, expense_in.category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with ID {expense_in.category_id} does not exist. A valid category must exist before creating an expense."
        )

    return crud.create_expense(db, expense_in)


@router.get(
    "",
    response_model=List[schemas.ExpenseListOut],
    summary="Fetch all expenses with category name and created_at"
)
def fetch_expenses(db: Session = Depends(get_db)):
    return crud.get_expenses(db)
