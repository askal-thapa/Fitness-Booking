# Askal Fitness Booking Platform

A full-stack fitness booking platform featuring a Next.js (React) frontend and a NestJS (Node.js) backend, utilizing Drizzle ORM to manage PostgreSQL, and integrating services like Stripe and Cloudinary.

## Prerequisites
- Node.js (v18+)
- PostgreSQL (running locally)

---

## Setup

Each service has its own `.env` and is run independently from its own directory.

### 1. Backend (`/backend`)

```bash
cd backend
```

**Copy and fill in your env:**
```bash
cp .env.example .env   # or create .env manually — see below
```

**Backend `.env` variables:**
```env
DATABASE_URL=postgres://localhost:5432/askal_trainer
PORT=3001
JWT_SECRET=your-secret-here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:3000
```

**Install dependencies:**
```bash
npm install
```

**Database setup (run in order):**
```bash
npm run db:generate   # Generate Drizzle migrations from schema
npm run db:migrate    # Apply migrations to PostgreSQL
npm run db:seed       # Seed the database with base data
```

**Start (development):**
```bash
npm run start:dev     # NestJS in watch mode
```

**Build & run (production):**
```bash
npm run build
npm run start:prod
```

---

### 2. Frontend (`/frontend`)

```bash
cd frontend
```

**Copy and fill in your env:**
```bash
cp .env.example .env   # or create .env manually — see below
```

**Frontend `.env` variables:**
```env
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Install dependencies:**
```bash
npm install
```

**Start (development):**
```bash
npm run dev           # Next.js dev server with hot reload
```

**Build & run (production):**
```bash
npm run build
npm run start
```

---

## URLs

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:3000    |
| Backend  | http://localhost:3001    |

---

## Directory Structure

```
/
├── backend/      # NestJS API
│   └── .env      # Backend environment variables
├── frontend/     # Next.js app
│   └── .env      # Frontend environment variables
└── README.md
```
