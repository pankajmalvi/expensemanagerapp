from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/summary", tags=["Summary"])

@router.get(
    "",
    response_model=schemas.SummaryOut,
    summary="Get overall statistics (total amount, total count, average amount)"
)
def get_summary(db: Session = Depends(get_db)):
    return crud.get_summary(db)
