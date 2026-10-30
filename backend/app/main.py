from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import categories, expenses, summary

# Initialize database schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Expense Manager API",
    description="Backend API for Expense Tracker with Categories and Summary Analytics",
    version="1.0.0"
)

# Configure CORS for Next.js frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount feature routers
app.include_router(categories.router)
app.include_router(expenses.router)
app.include_router(summary.router)

@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "app": "Expense Manager API"}
