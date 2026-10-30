export interface Category {
  id: number;
  name: string;
}

export interface CategorySummary {
  id: number;
  name: string;
  total_expenses: number;
}

export interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  created_at: string;
}

export interface ExpenseCreatedResponse {
  id: number;
  title: string;
  amount: number;
  category_id: number;
  created_at: string;
}

export interface ExpenseCreatePayload {
  title: string;
  amount: number;
  category_id: number;
}

export interface Summary {
  total: number;
  count: number;
  average: number;
}
