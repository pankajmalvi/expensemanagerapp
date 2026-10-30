from datetime import datetime
from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional

class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, description="Category name cannot be empty")

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not isinstance(v, str):
            raise ValueError("Category name must be a string.")
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Category name cannot be empty or whitespace only.")
        return trimmed


class CategoryOut(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class CategorySummaryOut(BaseModel):
    id: int
    name: str
    total_expenses: int

    model_config = ConfigDict(from_attributes=True)


class ExpenseCreate(BaseModel):
    title: str = Field(..., min_length=1, description="Expense title cannot be empty")
    amount: float = Field(..., gt=0, description="Expense amount must be strictly positive (> 0)")
    category_id: int = Field(..., gt=0, description="Category ID must be a positive integer")

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str) -> str:
        if not isinstance(v, str):
            raise ValueError("Expense title must be a string.")
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Expense title cannot be empty or whitespace only.")
        return trimmed

    @field_validator("amount")
    @classmethod
    def validate_amount(cls, v: float) -> float:
        if v <= 0:
            raise ValueError("Expense amount must be strictly greater than zero.")
        # Round to 2 decimal places for financial precision
        return round(float(v), 2)


class ExpenseCreateOut(BaseModel):
    id: int
    title: str
    amount: float
    category_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ExpenseListOut(BaseModel):
    id: int
    title: str
    amount: float
    category: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SummaryOut(BaseModel):
    total: float
    count: int
    average: float
