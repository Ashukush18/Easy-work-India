# Easy Work India

A web-based work management portal prototype featuring a public-facing website, user account pages, an administration dashboard, and a Node.js + SQLite backend.

## Overview

Easy Work India is designed as a central interface for managing work categories, user accounts, task allocation, earnings records, and administrative operations. The repository contains the website UI and the application-side JavaScript, along with a lightweight server and a JSON task pool.

> **Project status:** This repository should be treated as a development prototype until its authentication, payment, privacy, and deployment security have been independently reviewed. Do not use it to collect real Aadhaar documents, signatures, banking details, or payments in its current state.

## Main Features

### Public website
- Responsive landing page with project information and navigation.
- Work category and process information.
- Login and registration interface elements.
- FAQ, reviews, payout information, and contact sections.

### User area
- Account/profile interface.
- Work and task-related pages.
- Earnings and wallet-related interface elements.
- KYC/profile document fields and status-related UI.

### Administration
- Dashboard and user-management interface.
- Add, view, edit, and manage user records.
- Manage work projects, rates, and task-related information.
- Payment and withdrawal management interfaces.
- Reviews, announcements, notifications, and settings.

### Backend
- Node.js HTTP server.
- SQLite database using Node's built-in `node:sqlite` module.
- Database tables for users, projects, rates, tasks, work logs, and settings.
- JSON task-pool data and task-generation utility.

Feature availability may depend on the current database state and how the application is configured. UI elements are not proof that a real payment, KYC verification, or payout integration is operational.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js
- SQLite (`node:sqlite`)
- JSON

## Project Structure

| Path | Purpose |
|---|---|
| `index.html` | Public landing page |
| `styles.css` | Public website styles |
| `app.js` | Public website interactions |
| `admin.html` | Administration dashboard |
| `admin-styles.css` | Admin-specific styles |
| `admin.js` | Admin dashboard functionality |
| `account.html` | Account/profile page |
| `register.html` | Registration page |
| `auth_login_page.html` | Login page |
| `server.js` | Node.js server and SQLite database setup |
| `generate-tasks.js` | Task-generation utility |
| `tasks_pool.json` | Task-pool data |
| `package.json` | Project metadata and npm scripts |

The repository also includes older/backup pages and diagnostic scripts. These are retained as project files and may not be part of the current application flow.

## Requirements

- Node.js version **22.5 or newer** (a recent LTS release is recommended; the server uses the built-in `node:sqlite` module).
- npm (included with Node.js).

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/easy-work-india.git
   cd easy-work-india
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Open the application in your browser:

   ```text
   http://localhost:3000
   ```

The server creates `database.sqlite` in the project directory when it initializes. Keep this database file private and back it up securely if it contains data.

To use a different port:

**Windows PowerShell**
```powershell
$env:PORT=4000
npm start
```

**macOS / Linux**
```bash
PORT=4000 npm start
```

Then visit `http://localhost:4000`.

## Important Security Notes

Before deploying this project publicly:

- Remove all demo or hard-coded credentials from source files and replace them with secure environment-based configuration.
- Never commit real passwords, API keys, session secrets, database files, or user-uploaded documents.
- Review authentication, authorization, session handling, password hashing, input validation, rate limiting, and database queries.
- Do not store plaintext passwords. Remove any plaintext-password fields and migrate to a strong password-hashing approach.
- Add secure upload validation, private file storage, access controls, and retention policies before handling identity documents or signatures.
- Integrate a legitimate payment provider through its documented API. Do not treat a displayed wallet balance or payment status as proof of a real transaction.
- Use HTTPS and configure secure cookies, CORS, security headers, backups, logging, and production error handling.
- Review all user-facing earnings, payout, and employment claims to ensure they are accurate and legally compliant.

**Do not publish production credentials in this README or in the repository.** If credentials were previously committed, rotate them and remove them from the repository history.

## Configuration

The server currently reads the listening port from the `PORT` environment variable and otherwise uses port `3000`. Review `server.js` before deployment for any additional configuration or integrations that your deployment environment requires.

## Testing

The `package.json` currently provides `start` and `dev` scripts. A complete automated test suite is not configured yet.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes locally.
4. Submit a pull request describing the change.

## License

No open-source license has been specified yet. Unless a license is added, all rights remain with the repository owner and reuse is not automatically permitted.
