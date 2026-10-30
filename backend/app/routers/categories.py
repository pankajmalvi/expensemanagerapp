from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import CategoryCreate, CategoryOut, CategorySummaryOut
from .. import crud

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
def add_category(category_in: CategoryCreate, db: Session = Depends(get_db)):
    try:
        category = crud.create_category(db, category_in)
        return category
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

@router.get("", response_model=List[CategorySummaryOut], status_code=status.HTTP_200_OK)
def list_categories(db: Session = Depends(get_db)):
    return crud.get_categories_with_count(db)
