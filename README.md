# Lead Notes App

A full-stack Lead Notes application with Google authentication, note management, and email notifications.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: Firebase Auth (Google Sign-In)
- **API Client**: Axios
- **Integration**: Nodemailer (email notifications on note creation)

## Features

- Google Sign-In authentication
- Create, list, and delete notes
- Email notification when a note is created
- Modern dark theme UI

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/          # Database & Firebase config
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Email service
│   │   └── index.ts         # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── config/          # Firebase config
│   │   ├── services/        # API service
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Firebase project with Google Sign-In enabled
- Gmail account with App Password for Nodemailer

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd wellfound_project_1
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (see `.env.example`):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_service_account_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"
SMTP_EMAIL=your_gmail_address
SMTP_PASSWORD=your_gmail_app_password
```

Start the backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file (see `.env.example`):

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

Frontend runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint    | Description         | Auth |
| ------ | ----------- | ------------------- | ---- |
| GET    | /api/health | Health check        | No   |
| POST   | /notes      | Create a new note   | Yes  |
| GET    | /notes      | List user's notes   | Yes  |
| DELETE | /notes/:id  | Delete a note by ID | Yes  |

## Environment Variables

### Backend

| Variable              | Description                          |
| --------------------- | ------------------------------------ |
| PORT                  | Server port (default: 5000)          |
| MONGODB_URI           | MongoDB connection string            |
| FIREBASE_PROJECT_ID   | Firebase project ID                  |
| FIREBASE_CLIENT_EMAIL | Firebase service account email       |
| FIREBASE_PRIVATE_KEY  | Firebase private key (with newlines) |
| SMTP_EMAIL            | Gmail address for sending emails     |
| SMTP_PASSWORD         | Gmail App Password                   |

### Frontend

| Variable                          | Description             |
| --------------------------------- | ----------------------- |
| VITE_FIREBASE_API_KEY             | Firebase API key        |
| VITE_FIREBASE_AUTH_DOMAIN         | Firebase auth domain    |
| VITE_FIREBASE_PROJECT_ID          | Firebase project ID     |
| VITE_FIREBASE_STORAGE_BUCKET      | Firebase storage bucket |
| VITE_FIREBASE_MESSAGING_SENDER_ID | Firebase messaging ID   |
| VITE_FIREBASE_APP_ID              | Firebase app ID         |
| VITE_API_URL                      | Backend API URL         |