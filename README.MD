# Travel Advisor

A full-stack travel advisory application built with a modern tech stack.

## Project Structure

This monorepo consists of two main applications:

- **trip-advisor-backend**: A REST API server built with Hono, Drizzle ORM, and Better Auth.
- **trip-advisor-frontend**: A React application built with Vite, TanStack Router, and Shadcn UI.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **PostgreSQL** database
- **npm** (or yarn/pnpm/bun)

## Getting Started

### 1. Database Setup

Ensure you have a PostgreSQL database running. You will need the connection string for the backend configuration.

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd trip-advisor-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `trip-advisor-backend` directory with the following content:

```env
NODE_ENV=development
PORT=8787
CORS_ORIGIN=http://localhost:5173
BETTER_AUTH_URL=http://localhost:8787
BETTER_AUTH_SECRET=your_super_secret_random_string
DATABASE_URL=postgres://user:password@localhost:5432/travel_advisor
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Note:**
- Replace `your_super_secret_random_string` with a long random string.
- Replace `DATABASE_URL` with your actual PostgreSQL connection string.
- To obtain Google OAuth credentials, create a project in [Google Cloud Console](https://console.cloud.google.com/), set up OAuth consent screen, and create OAuth 2.0 Client ID.
  - **Authorized JavaScript origins**: `http://localhost:5173`
  - **Authorized redirect URIs**: `http://localhost:8787/api/auth/callback/google`

Run database migrations:

```bash
npm run auth:migrate
# or
npm run drizzle:push
```

Start the development server:

```bash
npm run dev
```

The backend server will start at `http://localhost:8787`.

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../trip-advisor-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `trip-advisor-frontend` directory:

```env
VITE_BETTER_AUTH_URL=http://localhost:8787/api/auth
```

Start the development server:

```bash
npm run dev
```

The frontend application will start at `http://localhost:5173`.

## Features

- **Authentication**: Email/Password and Google OAuth login powered by Better Auth.
- **Dashboard**: Protected admin/user dashboard with sidebar navigation.
- **Routing**: Type-safe routing using TanStack Router.
- **UI Components**: Beautiful, accessible components using Shadcn UI.
- **Database**: Type-safe database interactions with Drizzle ORM.

## Tech Stack

**Backend:**
- [Hono](https://hono.dev/) - Fast, lightweight web standard edge-ready web framework.
- [Better Auth](https://better-auth.com/) - Comprehensive authentication library.
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM for SQL databases.
- [PostgreSQL](https://www.postgresql.org/) - Relational database.

**Frontend:**
- [React](https://react.dev/) - UI Library.
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.
- [TanStack Router](https://tanstack.com/router) - Type-safe routing for React applications.
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
