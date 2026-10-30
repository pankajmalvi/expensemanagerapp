# Expense Manager - Antigravity Workspace Guidelines

## Overview
This workspace contains a full-stack Expense Manager application consisting of:
- **Backend**: FastAPI with SQLite (`backend/`)
- **Frontend**: Next.js App Router with TypeScript & Tailwind CSS (`frontend/`)

## Workspace Rules & Policies

### 1. Project Constraints (Mandatory)
All code and agent actions must adhere to the project constraints defined in `.agents/rules/project-constraints.md`:
- Category must exist prior to creating an expense.
- Expense title cannot be empty or whitespace-only.
- Expense amount must be strictly positive (`> 0`).
- Duplicate category names must be rejected (case-insensitive, trimmed).
- Graceful error handling across both client and server.
- Scope discipline: strictly follow PRD and `SPEC.md`, avoiding over-engineering.

### 2. Git Workflow & Commit Standards
All Git operations must follow the policies defined in `.agents/rules/git-workflow.md`:
- Atomic, logical commits using Conventional Commits format: `<type>(<scope>): <description>`.
- Types: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`.
- Never commit virtualenvs, node_modules, `.env`, or SQLite DB files.



Please add below enhancements as well in our project,
- Add preview links for our webpage so it doesn't looks like spam 