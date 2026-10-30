from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post(
    "",
    response_model=schemas.CategoryOut,
    status_code=status.HTTP_201_CREATED,
    summary="Add a new category"
)
def create_category(
    category_in: schemas.CategoryCreate,
    db: Session = Depends(get_db)
):
    # Constraint 4: Duplicate category names should be avoided
    existing = crud.get_category_by_name(db, category_in.name)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Category '{category_in.name}' already exists."
        )

    return crud.create_category(db, category_in)


@router.get(
    "",
    response_model=List[schemas.CategorySummaryOut],
    summary="List all categories with total number of expenses"
)
def list_categories(db: Session = Depends(get_db)):
    return crud.get_categories_with_count(db)
