# Askal Fitness Booking Plattform

A full-stack fitness booking platform featuring a Next.js (React) frontend and a NestJS (Node.js) backend, utilizing Drizzle ORM to manage PostgreSQL, and integrating various services like Stripe and Cloudinary.

## Prerequisites
- Node.js (v18+)
- PostgreSQL (Ensure it is running locally according to your `.env`)

## Getting Started

1. **Install all dependencies**
   Run the following command in the root directory. This will automatically install dependencies for the root, frontend, and backend folders.
   ```bash
   npm install
   ```

2. **Database Setup**
   Configure the database locally, generating types, running migrations, and seeding data all at once:
   ```bash
   npm run db:setup
   ```

3. **Development Mode**
   Start both the frontend and backend servers simultaneously with hot-reloading:
   ```bash
   npm run dev
   ```
   - Frontend will be available at: `http://localhost:3000`
   - Backend API will be available at: `http://localhost:3001`

---

## Available Root Commands

### Running the App
- `npm run dev`: Runs both backend (NestJS watch mode) and frontend (Next.js dev server).
- `npm run build`: Compiles production builds for both backend and frontend.
- `npm run start`: Runs both built production servers.

### Database Operations (Drizzle)
- `npm run db:setup`: Generates schemas, runs migrations, and seeds the db.
- `npm run db:generate`: Generates fresh Drizzle migrations based on your schema.
- `npm run db:migrate`: Applies migrations to your Postgres database.
- `npm run db:seed`: Seeds Postgres with base data from `backend/src/db/seed.ts`.

---

## Directory Structure
- `/frontend` - Next.js codebase
- `/backend` - NestJS codebase
- `/.env` - Unified environment parameters loaded dynamically by both ends.
