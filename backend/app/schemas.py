from datetime import datetime
from pydantic import BaseModel, ConfigDict, field_validator

class CategoryCreate(BaseModel):
    name: str

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        val = v.strip()
        if not val:
            raise ValueError("Category name cannot be empty or whitespace only.")
        return val

class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str

class CategorySummaryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    total_expenses: int

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category_id: int

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str) -> str:
        val = v.strip()
        if not val:
            raise ValueError("Expense title cannot be empty or whitespace only.")
        return val

    @field_validator("amount")
    @classmethod
    def validate_amount(cls, v: float) -> float:
        if v <= 0:
            raise ValueError("Expense amount must be strictly positive (greater than 0).")
        return round(float(v), 2)

class ExpenseCreatedOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    amount: float
    category_id: int
    created_at: str

class ExpenseListOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    amount: float
    category: str
    created_at: str

class SummaryOut(BaseModel):
    total: float
    count: int
    average: float
