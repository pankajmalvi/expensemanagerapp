from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import categories, expenses, summary

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Expense Manager API",
    description="Relational expense tracking service adhering to PRD specifications.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local dev (Next.js at port 3000)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(categories.router)
app.include_router(expenses.router)
app.include_router(summary.router)

@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "app": "Expense Manager API"}
