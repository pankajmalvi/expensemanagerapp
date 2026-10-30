from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Category, Expense
from .schemas import CategoryCreate, ExpenseCreate, CategorySummaryOut, ExpenseListOut, ExpenseCreatedOut, SummaryOut

def get_category_by_name(db: Session, name: str) -> Optional[Category]:
    cleaned = name.strip()
    return db.query(Category).filter(func.lower(Category.name) == cleaned.lower()).first()

def get_category_by_id(db: Session, category_id: int) -> Optional[Category]:
    return db.query(Category).filter(Category.id == category_id).first()

def create_category(db: Session, category_in: CategoryCreate) -> Category:
    cleaned_name = category_in.name.strip()
    existing = get_category_by_name(db, cleaned_name)
    if existing:
        raise ValueError(f"Category '{cleaned_name}' already exists.")
    
    cat = Category(name=cleaned_name)
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat

def get_categories_with_count(db: Session) -> List[CategorySummaryOut]:
    results = (
        db.query(
            Category.id,
            Category.name,
            func.count(Expense.id).label("total_expenses")
        )
        .outerjoin(Expense, Category.id == Expense.category_id)
        .group_by(Category.id, Category.name)
        .order_by(Category.id.asc())
        .all()
    )
    return [
        CategorySummaryOut(id=r.id, name=r.name, total_expenses=r.total_expenses)
        for r in results
    ]

def create_expense(db: Session, expense_in: ExpenseCreate) -> ExpenseCreatedOut:
    cat = get_category_by_id(db, expense_in.category_id)
    if not cat:
        raise ValueError(f"Category with id {expense_in.category_id} does not exist.")
    
    now = datetime.utcnow()
    exp = Expense(
        title=expense_in.title.strip(),
        amount=round(expense_in.amount, 2),
        category_id=expense_in.category_id,
        created_at=now
    )
    db.add(exp)
    db.commit()
    db.refresh(exp)
    return ExpenseCreatedOut(
        id=exp.id,
        title=exp.title,
        amount=float(exp.amount),
        category_id=exp.category_id,
        created_at=exp.created_at.isoformat()
    )

def get_expenses(db: Session) -> List[ExpenseListOut]:
    results = (
        db.query(Expense, Category.name.label("category_name"))
        .join(Category, Expense.category_id == Category.id)
        .order_by(Expense.created_at.desc(), Expense.id.desc())
        .all()
    )
    return [
        ExpenseListOut(
            id=exp.id,
            title=exp.title,
            amount=float(exp.amount),
            category=cat_name,
            created_at=exp.created_at.isoformat()
        )
        for exp, cat_name in results
    ]

def get_summary(db: Session) -> SummaryOut:
    count = db.query(func.count(Expense.id)).scalar() or 0
    total = db.query(func.sum(Expense.amount)).scalar()
    total_val = float(total) if total is not None else 0.0
    average = round(total_val / count, 2) if count > 0 else 0.0
    return SummaryOut(
        total=round(total_val, 2),
        count=count,
        average=average
    )
