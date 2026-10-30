import { CategorySummary, Category, Expense, ExpenseCreatePayload, ExpenseCreatedResponse, Summary } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMsg = `Server error (${res.status})`;
    try {
      const data = await res.json();
      if (data.detail) {
        if (Array.isArray(data.detail)) {
          // Pydantic validation errors
          errorMsg = data.detail.map((err: { msg?: string; loc?: string[] }) => err.msg || "Invalid input").join(", ");
        } else if (typeof data.detail === "string") {
          errorMsg = data.detail;
        }
      }
    } catch {
      // Non-JSON response
    }
    throw new Error(errorMsg);
  }
  return res.json() as Promise<T>;
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchCategories(): Promise<CategorySummary[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, { credentials: "omit", cache: "no-store" });
  return handleResponse<CategorySummary[]>(res);
}

export async function createCategory(name: string): Promise<Category> {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.trim() }),
  });
  return handleResponse<Category>(res);
}

export async function fetchExpenses(): Promise<Expense[]> {
  const res = await fetch(`${API_BASE_URL}/expenses`, { credentials: "omit", cache: "no-store" });
  return handleResponse<Expense[]>(res);
}

export async function createExpense(payload: ExpenseCreatePayload): Promise<ExpenseCreatedResponse> {
  const res = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.title.trim(),
      amount: Number(payload.amount),
      category_id: Number(payload.category_id),
    }),
  });
  return handleResponse<ExpenseCreatedResponse>(res);
}

export async function fetchSummary(): Promise<Summary> {
  const res = await fetch(`${API_BASE_URL}/summary`, { credentials: "omit", cache: "no-store" });
  return handleResponse<Summary>(res);
}
