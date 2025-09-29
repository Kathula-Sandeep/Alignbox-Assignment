# AlignBox Assignment

This project is a simple web application with a Node.js backend and a static frontend. It demonstrates basic CRUD operations and database integration.

## Project Structure

- `assets/` - Contains static assets (e.g., images)
- `public/` - Frontend files
  - `index.html` - Main HTML file
  - `css/styles.css` - Stylesheet
  - `js/app.js` - Frontend JavaScript
- `server/` - Backend Node.js server
  - `server.js` - Main server file
  - `db.js` - Database connection and queries
  - `package.json` - Node.js dependencies
- `sql/init.sql` - SQL script to initialize the database

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- SQLite (or compatible database)

### Installation
1. Clone the repository:
   ```powershell
   git clone <repo-url>
   cd sandeep_assignment
   ```
2. Install dependencies:
   ```powershell
   cd server
   npm install
   ```
3. Initialize the database:
   - Run the SQL script in `sql/init.sql` using your database tool.

### Running the Application
1. Start the backend server:
   ```powershell
   node server.js
   ```
2. Open `public/index.html` in your browser to view the frontend.

## Features
- User interface for basic operations
- Node.js backend with database integration
- Static assets and responsive design

## License
This project is for educational purposes.
