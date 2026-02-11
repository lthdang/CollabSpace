# CollabSpace

A modern internal video conferencing platform built with Next.js 15, Material-UI, LiveKit, and PostgreSQL.

## 🚀 Features

- **HD Video Conferencing**: Crystal clear video and audio powered by LiveKit
- **Team Collaboration**: Organize meetings by teams and organizations
- **Secure Authentication**: NextAuth with Google OAuth and credentials provider
- **Modern UI**: Beautiful interface with Material-UI v6 and Tailwind CSS
- **Real-time Communication**: LiveKit for seamless video/audio streaming
- **Database**: PostgreSQL with Prisma ORM for type-safe database access

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **UI Library**: Material-UI v6, Tailwind CSS
- **Authentication**: NextAuth v5 (Google OAuth + Credentials)
- **Database**: PostgreSQL 16, Prisma ORM
- **Real-time**: LiveKit
- **Utilities**: Lodash
- **Containerization**: Docker, Docker Compose

## 📋 Prerequisites

- Node.js 20+ and npm
- Docker and Docker Compose
- LiveKit account (for video conferencing)
- Google OAuth credentials (optional, for Google sign-in)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd CollabSpace
```

### 2. Set up environment variables

Copy the example environment file and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env` and fill in the required values:

- **Database**: Update PostgreSQL credentials if needed
- **NextAuth Secret**: Generate with `openssl rand -base64 32`
- **Google OAuth**: Get credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **LiveKit**: Get credentials from [LiveKit Cloud](https://cloud.livekit.io/)

### 3. Run with Docker (Recommended)

Start all services (Next.js app, PostgreSQL, pgAdmin):

```bash
docker-compose up --build
```

The application will be available at:
- **App**: http://localhost:3000
- **pgAdmin**: http://localhost:5050 (Database management)

### 4. Run locally (Development)

If you prefer to run without Docker:

```bash
# Install dependencies
npm install

# Start PostgreSQL (or use Docker for just the database)
docker-compose up db

# Generate Prisma Client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
CollabSpace/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── auth/             # NextAuth endpoints
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── loading.tsx           # Loading UI
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ThemeRegistry.tsx     # MUI theme provider
│   ├── EmotionCache.tsx      # Emotion SSR cache
│   ├── Navbar.tsx            # Navigation bar
│   ├── Loading.tsx           # Loading component
│   └── ErrorBoundary.tsx     # Error boundary
├── lib/                      # Utility libraries
│   ├── auth.ts               # NextAuth configuration
│   ├── prisma.ts             # Prisma client
│   └── utils.ts              # Helper functions
├── types/                    # TypeScript types
│   └── index.ts              # Type definitions
├── prisma/                   # Prisma schema
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── middleware.ts             # Route protection
├── docker-compose.yml        # Docker services
├── Dockerfile                # App container
└── package.json              # Dependencies
```

## 🗄️ Database Management

### Prisma Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Create migration
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

### pgAdmin Access

1. Navigate to http://localhost:5050
2. Login with credentials from `.env`:
   - Email: `admin@collabspace.local` (default)
   - Password: `admin` (default)
3. Add server:
   - Host: `db` (Docker network) or `localhost` (local)
   - Port: `5432`
   - Database: `collabspace`
   - Username: From `.env` (default: `collabspace`)
   - Password: From `.env`

## 🔐 Authentication

The application supports two authentication methods:

1. **Google OAuth**: Sign in with Google account
2. **Credentials**: Email and password (requires user registration)

To enable Google OAuth:
1. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth sessions | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `LIVEKIT_URL` | LiveKit server URL | Yes |
| `LIVEKIT_API_KEY` | LiveKit API key | Yes |
| `LIVEKIT_API_SECRET` | LiveKit API secret | Yes |

## 🐳 Docker Services

- **app**: Next.js application (port 3000)
- **db**: PostgreSQL 16 database (port 5432)
- **pgadmin**: Database management UI (port 5050)

## 🔧 Troubleshooting

### Database Connection Issues

If you can't connect to the database:

1. Ensure PostgreSQL is running: `docker-compose ps`
2. Check database logs: `docker-compose logs db`
3. Verify `DATABASE_URL` in `.env` matches Docker service name

### Port Conflicts

If ports are already in use:

1. Stop conflicting services
2. Or modify ports in `docker-compose.yml`

### Prisma Client Issues

If Prisma Client is not found:

```bash
npm run db:generate
```

## 📚 Next Steps

1. **Add LiveKit Integration**: Implement video conferencing rooms
2. **Create Meeting Pages**: Build UI for creating and joining meetings
3. **User Management**: Add user registration and profile pages
4. **Organization Management**: Create organization CRUD operations
5. **Real-time Features**: Add chat, screen sharing, recording

## 📄 License

This project is for internal use only.

## 🤝 Contributing

This is an internal project. Please follow the team's contribution guidelines.
