# ⭐ RateHub – Store Rating Platform

RateHub is a full-stack web application that allows users to rate and review stores, while store owners and administrators manage store listings through role-based dashboards.

The application follows a secure role-based authentication system using JWT and is deployed in production using **Vercel (Frontend)** and **Render (Backend)**.

---

## 🚀 Live Demo

* 🌐 Frontend: https://ratehub-web.vercel.app
* 🔗 Backend API: https://ratehub-7dyk.onrender.com

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* Role-Based Access Control (RBAC)
* CORS Configuration

### Deployment

* Vercel (Frontend)
* Render (Backend)
* PostgreSQL (Database)

---

## 👥 User Roles

### 👤 User

* Register & Login
* View stores
* Rate stores (1–5)
* Update rating

### 🏬 Store Owner

* Login
* View users who rated their store
* View average store rating

### 👑 Admin

* Add new stores
* Add new users
* View all users & stores
* Apply sorting & pagination
* Secure admin-only routes

---

## 🔐 Authentication & Security

* JWT-based authentication
* Password hashing
* Role-based route protection
* Secure CORS configuration for production
* Environment variable protection

---

## 📂 Project Structure

```
store-rating-app/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── ...
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/store-rating-app.git
cd store-rating-app
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

### Create `.env` file inside backend:

```
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://ratehub-web.vercel.app
```

### Run Backend

```
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
```

### Create `.env` file inside frontend:

```
VITE_API_URL=http://localhost:5000
```

### Run Frontend

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🌍 Production Deployment

## 🔹 Frontend (Vercel)

1. Import GitHub repo into Vercel

2. Set **Root Directory** to:

   ```
   frontend
   ```

3. Build Settings:

   * Framework: Vite
   * Build Command: `npm run build`
   * Output Directory: `dist`

4. Add Environment Variable:

   ```
   VITE_API_URL=https://ratehub-7dyk.onrender.com
   ```

5. Add `vercel.json` inside frontend folder:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🔹 Backend (Render)

1. Create new Web Service
2. Root directory: `backend`
3. Add environment variables:

   ```
   DATABASE_URL=
   JWT_SECRET=
   FRONTEND_URL=https://ratehub-web.vercel.app
   ```
4. Deploy

---

# 🧪 API Endpoints

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

### Stores

```
GET /api/stores
POST /api/stores (Admin only)
POST /api/stores/:id/rate (User only)
```

### Admin

```
GET /api/admin/users
GET /api/admin/stores
```

### Owner

```
GET /api/owner/dashboard
```

---

# 🧠 Key Features

* Full Role-Based System (Admin / Owner / User)
* Secure JWT Authentication
* Store Rating System (1–5)
* Pagination & Sorting
* Production Deployment
* Proper CORS Handling
* Clean UI with Tailwind CSS

---

# 📸 Future Improvements

* Email verification
* Password reset
* Store search & filtering
* Rating analytics charts
* Docker containerization

---

# 🤝 Contribution

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push branch
5. Open a Pull Request

---

# 📄 License

This project is open-source and available under the MIT License.

---

# 👨‍💻 Author

Vivek Yadav
Full-Stack Developer

---

⭐ If you like this project, give it a star on GitHub!
