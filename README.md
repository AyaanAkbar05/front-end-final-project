# TaskMaster

TaskMaster is a full-stack project and task management application built with a modern JavaScript stack. It includes secure authentication, project and task CRUD operations, and a clean SPA frontend built with React and TypeScript.

---

## Features

### User Authentication
- Email/password registration and login  
- JWT-based authentication with token persistence  
- Protected routes on both client and server  

### Project Management
- Create, edit, and delete projects  
- View all projects or open a single project's detail page  
- Update project name and description

### Task Management
- Add, edit, and delete tasks inside each project  
- Task statuses include: `todo`, `in-progress`, and `done`  
- Inline task editing and smooth UI updates without reloads  

### Authorization & Security
- Secure password hashing with bcrypt  
- Role-based access for admin-only endpoints  
- Middleware for token validation  

### Deployment
- Backend deployed on Render as a Web Service  
- Frontend deployed on Render as a Static Site  
- MongoDB Atlas used as the cloud database  
- Environment variables configured for secure communication

---

## Tech Stack

### Frontend
- React (Vite + TypeScript)
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- Passport.js (GitHub OAuth Strategy)
- JSON Web Tokens (JWT)
- bcrypt

### Hosting
- Render (frontend + backend)
- MongoDB Atlas

---

## Render Deployed Links:
- Frontend: https://front-end-final-project.onrender.com
- Backend: https://final-project-backend-fdvt.onrender.com

## Environment Variables

### Backend `.env`

```
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<JWT secret>
GITHUB_CLIENT_ID=<GitHub OAuth client ID>
GITHUB_CLIENT_SECRET=<GitHub OAuth client secret>
GITHUB_CALLBACK_URL=<your backend OAuth callback URL>
CLIENT_URL=<your frontend deployed URL>
```

### Frontend `.env`

```
VITE_API_URL=<backend deployed URL>/api
```

---

## Running Locally

### Backend

```bash
cd final-project-backend
npm install
node server.js
```

### Frontend

```bash
cd frontend-final-project
npm install
npm run dev
```

---

## Deployment Guide (Render)

### Backend Deployment
- Build Command: `npm install`
- Start Command: `node server.js`
- Add environment variables  
- Ensure MongoDB Atlas is connected  

### Frontend Deployment
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Add VITE_API_URL pointing to the backend URL  

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login and return JWT |
| GET | `/api/users/auth/github` | Start GitHub OAuth |
| GET | `/api/users/auth/github/callback` | OAuth callback |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create project |
| GET | `/api/projects/:id` | Get project by ID |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:projectId/tasks` | Get tasks |
| POST | `/api/projects/:projectId/tasks` | Create task |
| PUT | `/api/tasks/:taskId` | Update task |
| DELETE | `/api/tasks/:taskId` | Delete task |

---
