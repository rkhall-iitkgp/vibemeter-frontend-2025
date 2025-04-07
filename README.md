# VibeMeter Frontend
A modern frontend application for employee well-being analytics, built with React, TypeScript, and Vite.

## Overview
VibeMeter Frontend provides an intuitive interface for Deloitte's employee well-being system. It offers:
- Real-time mood tracking visualization
- AI-powered conversational interface
- Administrative dashboard for the People Experience team
- Employee analytics and focus group management

## Getting Started
### Prerequisites
- Node.js (v16 or newer)
- pnpm package manager (v7 or newer)

If you don't have pnpm installed, you can install it with:
```bash
npm install -g pnpm
```

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rkhall-iitkgp/vibemeter-frontend-2025.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd vibemeter-frontend-2025
   ```

3. **Install Dependencies:**
   ```bash
   pnpm install
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory:
   ```
   VITE_BACKEND_URL=your_api_url_here
   ```

5. **Start the Development Server:**
   ```bash
   pnpm run dev
   ```
   The application should now be running at `http://localhost:5173`

## Tech Stack
- **React** - UI library for building interactive components
- **TypeScript** - Strongly typed programming language for better code quality
- **Vite** - Fast build tool and development server
- **pnpm** - Disk space efficient package manager
- **Tailwind CSS** - Utility-first CSS framework
- **D3.js** - Data visualization library
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **WebSocket** - Real-time communication with the backend

## Project Structure
```
vibemeter-frontend-2025/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/            # Given data and data constants
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries and integrations
│   ├── pages/           # Application pages/routes
│   ├── services/        # API service functions
│   ├── store/           # Redux state management
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # Vite type declarations
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Git ignore rules
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Available Scripts

- `pnpm run dev` - Start the development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview the production build locally
- `pnpm run lint` - Run ESLint
- `pnpm run lint:fix` - Run ESLint and fix automatically fixable issues
- `pnpm run test` - Run tests
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:coverage` - Run tests with coverage report

## Deployment
To build the application for production:
```bash
pnpm run build
```
This will generate optimized files in the `dist` directory that can be deployed to any static hosting service.
