# Git Workflow and Commit Guidelines

These rules govern all Git operations in the Expense Manager project.

## 1. Commit Discipline & Cadence
- Make small, atomic, logical commits. Never bundle unrelated changes across frontend, backend, and documentation in a single unstructured commit.
- Commit working code after verifying functionality (tests or manual validation).
- Never commit build artifacts, temporary files, local databases (`*.db`, `*.sqlite`), virtual environments (`venv/`), or dependency directories (`node_modules/`).

## 2. Commit Message Standards
All commit messages must follow the **Conventional Commits** specification:

`<type>(<optional scope>): <short description in present tense>`

### Types:
- `feat`: A new user-facing feature or API endpoint (e.g., `feat(backend): add category management API endpoints`)
- `fix`: A bug fix (e.g., `fix(api): prevent division by zero in GET /summary`)
- `test`: Adding or updating automated tests (e.g., `test(backend): add test suite for expense constraints`)
- `docs`: Documentation updates (e.g., `docs: update SPEC.md with SQLite pragma details`)
- `refactor`: Code refactoring without behavioral changes (e.g., `refactor(frontend): extract summary card into component`)
- `chore`: Build tasks, dependency updates, directory structure setup (e.g., `chore: initialize repository and gitignore`)

### Content Requirements:
- Title line: imperative mood, lowercase, no trailing period, maximum 72 characters.
- Body (when appropriate): explain *what* was changed and *why*, highlighting any non-obvious design choices.
