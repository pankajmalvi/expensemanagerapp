from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import ExpenseCreate, ExpenseCreatedOut, ExpenseListOut
from .. import crud

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("", response_model=ExpenseCreatedOut, status_code=status.HTTP_201_CREATED)
def add_expense(expense_in: ExpenseCreate, db: Session = Depends(get_db)):
    try:
        created_expense = crud.create_expense(db, expense_in)
        return created_expense
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("", response_model=List[ExpenseListOut], status_code=status.HTTP_200_OK)
def list_expenses(db: Session = Depends(get_db)):
    return crud.get_expenses(db)
