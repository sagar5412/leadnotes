# Lead Notes App

A full-stack Lead Notes application with Google authentication, note management, and email notifications.

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: Firebase Auth (Google Sign-In)
- **API Client**: Axios
- **Email Service**: Resend

## Features

- 🔐 Google Sign-In authentication
- 📝 Create, list, and delete notes
- 📧 Email notification via Resend when a note is created
- 🎨 Modern dark theme UI with Tailwind CSS

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Firebase config
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Email service (Resend)
│   │   └── index.ts         # Entry point
│   ├── railway.json         # Railway deployment config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── config/          # Firebase config
│   │   ├── services/        # API service
│   │   └── App.tsx
│   ├── vercel.json          # Vercel deployment config
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Firebase project with Google Sign-In enabled
- Resend account (for emails)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd lead_note
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_service_account_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
RESEND_API_KEY=re_123456789
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## Deployment

### Backend (Railway)

1. Connect your GitHub repository to Railway.
2. Select the repository and set the root directory to `backend` (if generic) or let Railway detect `railway.json`.
3. Add the following **Environment Variables** in Railway:
   - `MONGODB_URI`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (Paste the full key including `-----BEGIN...`)
   - `RESEND_API_KEY`
   - `FRONTEND_URL` (e.g., `https://your-frontend.vercel.app`)
4. Railway will automatically deploy.

### Frontend (Vercel)

1. Import the project into Vercel and select the `frontend` directory as the root.
2. Add the following **Environment Variables** in Vercel:
   - `VITE_API_URL` (Your Railway Backend URL, e.g., `https://your-backend.up.railway.app`)
   - All `VITE_FIREBASE_*` variables from your local `.env`.
3. Deploy!

## API Endpoints

| Method | Endpoint    | Description         | Auth |
| ------ | ----------- | ------------------- | ---- |
| GET    | /api/health | Health check        | No   |
| POST   | /notes      | Create a new note   | Yes  |
| GET    | /notes      | List user's notes   | Yes  |
| DELETE | /notes/:id  | Delete a note by ID | Yes  |
