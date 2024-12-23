# BlogAI - Full Stack Blog Platform

A modern blog platform built with React, Node.js, and MongoDB. Features a clean UI, dark mode support, and AI-powered features.

## 🚀 Features

- 📱 Responsive design with dark/light mode
- ✨ Modern UI with Tailwind CSS
- 🔒 User authentication (coming soon)
- 📝 CRUD operations for blog posts
- 🎨 Rich text editor (coming soon)
- 🌐 RESTful API architecture
- 🔍 Search functionality (coming soon)

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- React Router DOM
- Lucide Icons
- Vite

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JSON Web Tokens (coming soon)
- Docker

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/AbhinavKRN/Tusky.git
cd blog-ai
```

2. Install dependencies for both frontend and backend:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables:

Frontend (.env):
```env
VITE_API_URL=http://localhost:5000
```

Backend (.env):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=your_secret_key
```

4. Start development servers:

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## 🐳 Docker Setup

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
blog-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── styles/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── package.json
└── docker-compose.yml
```

## 🔨 API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Authentication (Coming Soon)
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](License.md) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB](https://www.mongodb.com)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)