---
description: Goal: Initialize the complete project structure and basic setup for CollabSpace - an internal video conferencing application similar to Google Meet, built with modern Next.js stack.
---


Context:
- Framework: Next.js 15+ with App Router and TypeScript
- UI Library: Material-UI (MUI) v6+ with @mui/material, @mui/icons-material, @emotion/react, @emotion/styled
- Utility: Lodash (for deep clone, debounce, etc.)
- Database: PostgreSQL running in Docker
- Real-time video/audio: LiveKit (using @livekit/components-react and livekit-client)
- Authentication: Auth.js (NextAuth) with credentials and Google OAuth
- ORM: Prisma
- Styling: MUI + Tailwind CSS (combine both where appropriate)
- Project name: CollabSpace

Requirements:
- Create a clean, feature-based folder structure
- Folders to include: app/, components/, lib/, hooks/, types/, prisma/, services/, styles/, public/
- Set up Prisma schema with PostgreSQL for initial entities: User, Organization, Meeting, Participant
- Add .env.example with all necessary variables:
  - DATABASE_URL (postgresql://...)
  - LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET
  - NEXTAUTH_SECRET, NEXTAUTH_URL
  - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (for OAuth)
- Set up Docker for development:
  - Include Dockerfile for Next.js app
  - Include docker-compose.yml with services: app (Next.js), db (PostgreSQL), and optionally pgadmin
  - PostgreSQL should use volume for data persistence
  - Expose ports correctly (3000 for app, 5432 for db)
- Configure MUI theme in app/providers or similar (create ThemeProvider wrapper)
- Add Lodash as dependency and demonstrate basic usage in one example file if possible
- Create basic root layout (app/layout.tsx) with MUI ThemeProvider, CssBaseline, and simple navbar
- Include middleware.ts to protect /meeting/* routes for authenticated users
- Add basic error boundary and loading states using MUI components (CircularProgress, Alert, etc.)
- Use server components by default; mark "use client" only when necessary (LiveKit, interactive MUI components)
- Add .dockerignore and .gitignore properly
- Include basic README.md section about how to run with Docker

Output format:
- First, show the proposed folder structure as a markdown tree
- Then, provide complete content for the following key files in code blocks:
  - Dockerfile
  - docker-compose.yml
  - .env.example
  - prisma/schema.prisma
  - app/layout.tsx
  - components/ThemeRegistry.tsx (or wherever MUI theme is set up)
  - middleware.ts (basic auth protection)
  - package.json dependencies section (relevant parts only)
- Do not implement full features yet — focus on scaffolding, configuration, and Docker setup
- Add clear comments in the code explaining important parts