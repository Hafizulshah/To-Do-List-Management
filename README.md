# To-Do List App

A simple To-Do List application built as part of an interview assessment.

- **Backend:** ASP.NET Core (.NET 8)
- **Frontend:** ReactJS + Vite

---

## Getting Started

Before launching the app via `launch.bat`, follow these steps:

### 1. Install Frontend Dependencies
Open a terminal and run:
```bash
cd frontend
npm install
```

### 2. Restore & Build Backend
If you're still in the frontend folder, move back and run:

```bash
cd ..
cd src/ToDoListManagement.API
dotnet restore
dotnet build
```

### 3. Run the App
From the root directory, launch the app:
```bash
launch.bat
```
