

```markdown
# Library Management System

This is a simple Library Management System built using ASP.NET Core, React, TypeScript, and SQLite with Entity Framework. Documentation is available in Swagger and can be found in the `api-documentation` PDF inside the main folder.

**Frontend runs on:** [http://localhost:5173/](http://localhost:5173/)  
**Swagger UI runs on:** [http://localhost:5180/swagger/index.html](http://localhost:5180/swagger/index.html)

## Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Suresh-Istina/LibraryManagementAPI.git
   ```

2. Navigate to the project directory:
   ```bash
   cd LibraryManagementAPI
   ```

3. Restore dependencies:
   ```bash
   dotnet restore
   ```

4. Update the database:
   ```bash
   dotnet ef database update
   ```

5. Run the backend application:
   ```bash
   dotnet run
   ```

6. Access Swagger UI after the application starts:
   ```markdown
   http://localhost:5180/swagger/index.html
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend:
   ```bash
   npm run dev
   ```

4. Access the frontend after the application starts:
   ```markdown
   http://localhost:5173/
   ```
```

