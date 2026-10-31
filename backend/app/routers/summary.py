from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import SummaryOut
from .. import crud

router = APIRouter(prefix="/summary", tags=["Summary"])

@router.get("", response_model=SummaryOut, status_code=status.HTTP_200_OK)
@router.get("/", response_model=SummaryOut, status_code=status.HTTP_200_OK, include_in_schema=False)
def get_overall_summary(db: Session = Depends(get_db)):
    return crud.get_summary(db)
