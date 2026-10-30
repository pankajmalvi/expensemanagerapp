from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from typing import List, Optional, Dict, Any
from . import models, schemas

def get_category_by_id(db: Session, category_id: int) -> Optional[models.Category]:
    return db.query(models.Category).filter(models.Category.id == category_id).first()


def get_category_by_name(db: Session, name: str) -> Optional[models.Category]:
    trimmed_name = name.strip()
    return db.query(models.Category).filter(
        func.lower(models.Category.name) == func.lower(trimmed_name)
    ).first()


def create_category(db: Session, category_in: schemas.CategoryCreate) -> models.Category:
    clean_name = category_in.name.strip()
    db_category = models.Category(name=clean_name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def get_categories_with_count(db: Session) -> List[Dict[str, Any]]:
    # Outer join to ensure categories with 0 expenses are also returned
    results = (
        db.query(
            models.Category.id,
            models.Category.name,
            func.count(models.Expense.id).label("total_expenses")
        )
        .outerjoin(models.Expense, models.Category.id == models.Expense.category_id)
        .group_by(models.Category.id)
        .order_by(models.Category.id.asc())
        .all()
    )

    return [
        {
            "id": r.id,
            "name": r.name,
            "total_expenses": r.total_expenses
        }
        for r in results
    ]


def create_expense(db: Session, expense_in: schemas.ExpenseCreate) -> models.Expense:
    clean_title = expense_in.title.strip()
    clean_amount = round(expense_in.amount, 2)

    db_expense = models.Expense(
        title=clean_title,
        amount=clean_amount,
        category_id=expense_in.category_id,
        created_at=datetime.utcnow()
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


def get_expenses(db: Session) -> List[Dict[str, Any]]:
    expenses = (
        db.query(models.Expense)
        .join(models.Category, models.Expense.category_id == models.Category.id)
        .order_by(models.Expense.created_at.desc(), models.Expense.id.desc())
        .all()
    )

    return [
        {
            "id": exp.id,
            "title": exp.title,
            "amount": round(float(exp.amount), 2),
            "category": exp.category.name,
            "created_at": exp.created_at
        }
        for exp in expenses
    ]


def get_summary(db: Session) -> Dict[str, Any]:
    row = db.query(
        func.coalesce(func.sum(models.Expense.amount), 0.0).label("total"),
        func.count(models.Expense.id).label("count")
    ).first()

    total = round(float(row.total), 2) if row and row.total else 0.0
    count = int(row.count) if row and row.count else 0
    average = round(total / count, 2) if count > 0 else 0.0

    return {
        "total": total,
        "count": count,
        "average": average
    }
