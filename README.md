# Book Library Manager — MERN Student Project
**Digital Book Library Management Platform**

---

## 1. Introduction

### 1.1 Purpose
This document defines the end-to-end technical design and implementation of **Book Library Manager**, a full-stack web application that allows administrators to manage a digital book library and enables users to browse, search, and maintain personalized reading lists.

### 1.2 Target Audience
- Students learning MERN stack development
- Developers exploring full-stack architecture
- Anyone interested in building library management systems

### 1.3 Learning Outcomes
- CRUD operations using MongoDB, Express, and Node.js
- Role-based access control (User and Admin)
- REST API architecture
- MongoDB schema design using Mongoose
- Frontend development using React
- User authentication with password hashing (bcrypt)
- JWT-based authentication
- Search and filtering functionality
- Responsive UI design

---

## 2. System Overview

### 2.1 User Roles

| Role  | Description                                      |
|-------|--------------------------------------------------|
| User  | Browses books, searches, and manages reading list |
| Admin | Manages books, categories, and system content     |

### 2.2 Core Features

**User Features:**
- User registration and login with JWT authentication
- Browse all available books
- Search books by title, author, or category
- Filter books by category
- View detailed book information
- Add/remove books from personal reading list
- Personal reading list dashboard

**Admin Features:**
- View all books with statistics
- Add new books
- Edit existing books
- Delete books
- Create and manage book categories
- Delete categories
- Content moderation

**Book Management Features:**
- Comprehensive book details (title, author, category, description)
- Category-based organization
- Search functionality
- Responsive design
- User-specific reading lists

---

## 3. High-Level Architecture

```
[ React App ]
     |
     |------ REST API ------|
                            |
                   [ Node.js + Express ]
                            |
                      [ MongoDB ]
```

**Key Principle:** Separation of concerns with RESTful API design

---

## 4. Database Design (DB-First Approach)

### 4.1 Database
- **MongoDB Atlas** (Cloud) or Local MongoDB
- **ODM:** Mongoose

### 4.2 Collections

#### 4.2.1 users
```javascript
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed with bcrypt)",
  "role": "user | admin",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:** 
- `email` (unique)

#### 4.2.2 books
```javascript
{
  "_id": "ObjectId",
  "title": "string",
  "author": "string",
  "categoryId": "ObjectId (ref: Category)",
  "description": "string",
  "isbn": "string (optional)",
  "publishedYear": "number (optional)",
  "coverImage": "string (optional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:**
- `title`
- `author`
- `categoryId`

#### 4.2.3 categories
```javascript
{
  "_id": "ObjectId",
  "name": "string (unique)",
  "description": "string (optional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:**
- `name` (unique)

#### 4.2.4 readinglists
```javascript
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "bookId": "ObjectId (ref: Book)",
  "addedAt": "Date"
}
```
**Indexes:**
- `userId`
- `bookId`
- Compound index: `userId + bookId` (unique)

---

## 5. Backend Design (Node.js + Express)

### 5.1 Technology Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (Password Hashing)
- CORS

### 5.2 Backend Folder Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── categoryController.js
│   │   ├── readingListController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Category.js
│   │   └── ReadingList.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── readingListRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roleCheck.js
│   └── index.js
├── .env
├── .env.example
├── package.json
└── .gitignore
```

### 5.3 Authentication Flow
1. User registers with name, email, and password
2. Password is hashed using bcrypt
3. User logs in with email and password
4. Backend validates credentials
5. JWT token is issued with user ID and role
6. Token is sent to frontend and stored
7. Protected routes verify JWT token via middleware

### 5.4 API Endpoints

#### Auth APIs
| Method | Endpoint       | Description          | Auth Required |
|--------|----------------|----------------------|---------------|
| POST   | /auth/register | Register new user    | No            |
| POST   | /auth/login    | User login           | No            |
| GET    | /auth/profile  | Get user profile     | Yes           |

#### Book APIs
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | /books                | Get all books            | No            |
| GET    | /books/search         | Search books             | No            |
| GET    | /books/:id            | Get book by ID           | No            |
| POST   | /books                | Create book              | Yes (Admin)   |
| PUT    | /books/:id            | Update book              | Yes (Admin)   |
| DELETE | /books/:id            | Delete book              | Yes (Admin)   |

#### Category APIs
| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | /categories           | Get all categories       | No            |
| GET    | /categories/:id       | Get category by ID       | No            |
| POST   | /categories           | Create category          | Yes (Admin)   |
| PUT    | /categories/:id       | Update category          | Yes (Admin)   |
| DELETE | /categories/:id       | Delete category          | Yes (Admin)   |

#### Reading List APIs
| Method | Endpoint                    | Description                  | Auth Required |
|--------|-----------------------------|------------------------------|---------------|
| GET    | /reading-list               | Get user's reading list      | Yes           |
| POST   | /reading-list               | Add book to reading list     | Yes           |
| DELETE | /reading-list/:bookId       | Remove book from list        | Yes           |

#### Admin APIs
| Method | Endpoint                    | Description                  | Auth Required |
|--------|-----------------------------|------------------------------|---------------|
| GET    | /admin/dashboard            | Get dashboard statistics     | Yes (Admin)   |
| GET    | /admin/users                | Get all users                | Yes (Admin)   |
| DELETE | /admin/users/:id            | Delete user                  | Yes (Admin)   |

### 5.5 Role-Based Access Control
- Middleware validates JWT token
- User role is extracted from token
- Admin-only routes check for admin role
- Users can only access their own reading lists

---

## 6. Frontend Design (React)

### 6.1 Tech Stack
- React
- React Router
- Material-UI (MUI) or Bootstrap
- Context API (State Management)
- Axios (HTTP Client)

### 6.2 Folder Structure
```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── BookCard.js
│   │   ├── SearchBar.js
│   │   ├── CategoryFilter.js
│   │   └── ProtectedRoute.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── BookDetails.js
│   │   ├── ReadingList.js
│   │   ├── AdminDashboard.js
│   │   ├── AddBook.js
│   │   ├── EditBook.js
│   │   └── CategoryManagement.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── config.js
├── .env
├── .env.example
├── package.json
└── .gitignore
```

### 6.3 Key Pages
- **Home:** Browse all books with search and filter
- **Login/Register:** User authentication
- **Book Details:** View detailed book information
- **Reading List:** User's saved books
- **Admin Dashboard:** View statistics and manage content
- **Add/Edit Book:** Form for book management
- **Category Management:** Create and manage categories

---

## 7. Security Considerations

- **Password Security:** bcrypt hashing with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Role-Based Authorization:** Middleware protection
- **Input Validation:** Server-side validation
- **CORS Configuration:** Controlled cross-origin access
- **Environment Variables:** Sensitive data in .env files
- **SQL Injection Prevention:** Mongoose parameterized queries

---

## 8. Setup Instructions

### 8.1 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- Git

### 8.2 Backend Setup
```bash
cd backend
npm install

# Create .env file with your credentials
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev

# Start production server
npm start
```

### 8.3 Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your backend API URL

# Start development server
npm start

# Build for production
npm run build
```

### 8.4 Database Setup
1. Create MongoDB Atlas account or install MongoDB locally
2. Create a new database named `book_library`
3. Copy connection string to backend .env file
4. Collections will be created automatically on first use

### 8.5 Environment Variables

**Backend (.env):**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 9. Development Workflow

### 9.1 Recommended Practices
- Use meaningful variable and function names
- Write comments for complex logic
- Test API endpoints using Postman or Thunder Client
- Use Git for version control
- Follow REST API conventions
- Validate user input on both frontend and backend

### 9.2 Testing
- Test user registration and login
- Test book CRUD operations
- Test category management
- Test reading list functionality
- Test search and filter features
- Test role-based access control
- Test responsive design on different devices

---

## 10. Future Enhancements

- Book ratings and reviews
- Borrowing and return tracking system
- User activity analytics
- Email notifications for new books
- Advanced search with multiple filters
- Book recommendations based on reading history
- User profile pages with reading statistics
- Multi-language support
- Export reading list functionality
- Social features (share books, follow users)
- Book availability status
- Reservation system

---

## 11. Conclusion

The Book Library Manager application offers a practical solution for digital library management. It combines essential features such as CRUD operations, role-based access, search functionality, and personalized user reading lists, making it an ideal project for learning full-stack MERN development and understanding modern web application architecture.
