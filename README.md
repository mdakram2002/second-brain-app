#  Second Brain App

A **modern, responsive full-stack web application** for managing and organizing knowledge resources such as **notes, links, and insights** with a clean UI and scalable backend.

---

## Features

### 🔹 Core Functionality
- Multiple Content Types: Notes, links, and insights
- Smart Organization: Tag-based categorization
- Dual View Modes: Grid & List views
- Search & Filter: Fast keyword and tag filtering
- Favorites System: Bookmark important knowledge items


###  Performance & Security
- Optimized rendering using memoization
- JWT-based authentication
- Encrypted sensitive data
- Offline support (PWA-ready)
- API caching with Redis

---

##  Tech Stack

### Frontend
- React 18
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod Validation
- React Query
- Zustand (Store)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (File uploads)

### Dev & Tooling
- ESLint & Prettier
- VS Code
- Postman API
- Gemini AI

---


**API Endpoints**
```
Authentication
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout

```

**Knowledge Items**

```
GET /api/items - Get all items (with filtering)
POST /api/items - Create new item
GET /api/items/:id - Get single item
PUT /api/items/:id - Update item
DELETE /api/items/:id - Delete item
POST /api/items/:id/favorite - Toggle favorite

```

## 📁 Project Structure

```text
second-brain-app/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── ai/
│   │   │   ├── common/
│   │   │   ├── knowledge/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── store/
│   │   └── styles/
│   │       └── globals.css
│   │
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── jsconfig.json
│   ├── package.json
│   └── README.md
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md

```


