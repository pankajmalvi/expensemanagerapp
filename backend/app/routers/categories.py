from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import CategoryCreate, CategoryOut, CategorySummaryOut
from .. import crud

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=CategoryOut, status_code=status.HTTP_201_CREATED, include_in_schema=False)
def add_category(category_in: CategoryCreate, db: Session = Depends(get_db)):
    cleaned_name = category_in.name.strip()
    if not cleaned_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category name cannot be empty or whitespace only."
        )
    existing = crud.get_category_by_name(db, cleaned_name)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Category '{cleaned_name}' already exists."
        )
    try:
        category = crud.create_category(db, category_in)
        return category
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

@router.get("", response_model=List[CategorySummaryOut], status_code=status.HTTP_200_OK)
@router.get("/", response_model=List[CategorySummaryOut], status_code=status.HTTP_200_OK, include_in_schema=False)
def list_categories(db: Session = Depends(get_db)):
    return crud.get_categories_with_count(db)
