# Syncr Lite UI

A React-based frontend for the Syncr Lite application, providing an intuitive user interface for workout management, scheduling, and activity tracking.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Development](#development)
- [Container Architecture](#container-architecture)
- [Building for Production](#building-for-production)

## Overview

This application serves as the frontend for Syncr Lite, a workout tracking platform. It provides a responsive and intuitive interface for users to create, manage, and track their workout routines.

## Features

- **Dashboard**

  - Today's scheduled workout
  - Recent workout history
  - Upcoming workout preview
  - Quick actions menu

- **Workout Management**

  - Create custom workout templates
  - Add/edit exercises
  - Configure sets, reps, and duration
  - Save templates for reuse

- **Workout Planning**

  - Calendar-based scheduling
  - Drag-and-drop interface
  - Weekly calendar views
  - Rescheduling functionality

- **Activity Tracking**

  - Workout completion tracking
  - Historical workout data
  - Consistency metrics

- **Responsive Design**
  - Mobile-first approach
  - Consistent experience across devices
  - Intuitive navigation

## Technology Stack

- **Framework**: React with Vite
- **State Management**: Redux
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **Containerization**: Docker & Docker Compose
- **Development Server**: Vite dev server
- **Node Version**: 20.x

## Project Structure

```
syncr-lite-ui/
│
├── public/              # Static files
│
├── src/                 # Source code
│   ├── app/             # App configuration
│   ├── assets/          # Images, icons, and other assets
│   │
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components
│   │   ├── layout/      # Layout components
│   │   └── overlays/    # Modal and overlay components
│   │
│   ├── context/         # React context providers
│   │   ├── AuthContext.ts
│   │   ├── AuthProvider.tsx
│   │   ├── ModalsContext.tsx
│   │   └── ModalsProvider.tsx
│   │
│   ├── features/        # Feature-based organization
│   │   ├── activity/    # Activity tracking feature
│   │   ├── auth/        # Authentication feature
│   │   ├── calendar/    # Calendar/scheduling feature
│   │   └── workouts/    # Workout management feature
│   │
│   ├── pages/           # Page components
│   │   ├── activity/    # Activity tracking pages
│   │   ├── auth/        # Authentication pages
│   │   ├── dashboard/   # Dashboard page
│   │   └── planner/     # Calendar/planning pages
│   │
│   ├── routes/          # Application routing
│   ├── services/        # API service calls
│   │
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   ├── styles.css       # Global styles
│   └── vite-env.d.ts    # Vite environment types
│
├── .dockerignore        # Docker ignore file
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Docker configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML entry point
├── package.json         # npm dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

> **Note:** Each feature module (activity, auth, calendar, workouts) follows a consistent internal structure with:
>
> - `api/`: Feature-specific API services
> - `components/`: Feature-specific UI components
> - `hooks/`: Custom React hooks
> - `types/`: TypeScript type definitions
> - `slice.ts`: Redux slice for state management

## Setup and Installation

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development without Docker)
- Git

### Using Docker (Recommended)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd syncr-lite-ui
   ```

2. Build and start the container:

   ```bash
   docker compose up --build
   ```

3. Access the application at `http://localhost:5173`

### Local Development (Alternative)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd syncr-lite-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:

   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Development

### Daily Development Workflow

```bash
# Start the container
docker compose up

# Stop the container
docker compose down
```

### Environment Variables

The application uses the following environment variables:

| Variable     | Description     | Default               |
| ------------ | --------------- | --------------------- |
| VITE_API_URL | Backend API URL | http://localhost:8000 |

## Container Architecture

The frontend application is containerized with the following configuration:

- **Base Image**: Node 20 Alpine (lightweight)
- **Port Mapping**: 5173:5173 (Vite dev server)
- **Volume Mapping**:
  - `.:/app`: Maps local code to container for live updates
  - `/app/node_modules`: Preserves container's node_modules

This setup enables:

- Hot-reloading for immediate feedback during development
- Consistent development environment across team members
- Isolation from local Node.js version requirements

## Connecting to the Backend

This UI is designed to work with the [Syncr Lite API](https://github.com/Mariella-Arias/syncr-lite-api). Make sure the backend is running and accessible at the URL specified in the `VITE_API_URL` environment variable.
