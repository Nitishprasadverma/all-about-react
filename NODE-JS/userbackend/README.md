

**Full-Stack User Info & Login System (Instagram-like)**

**## Overview**

This project is a full-stack user authentication system inspired by Instagram. It allows users to sign up, log in, and access a user profile page where their information is displayed. The system is built using **HTML, CSS, JavaScript** for the front-end and **Express.js, MongoDB** for the back-end.

**## Features**

- **User Registration**: Users can sign up with their **name, username, bio, email, and password**.
- **User Authentication**: Login system with **JWT token authentication**.
- **Password Security**: Hashed and salted passwords for enhanced security.
- **Protected Routes**: Only authenticated users can access certain routes.
- **Session Management**: JWT tokens are stored in cookies.
- **User Profile Page**: Displays user details fetched from the backend.

**## Tech Stack**

**### Front-End**
- **HTML**
- **CSS**
- **JavaScript**

**### Back-End**
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ORM)
- **JWT** (for authentication)
- **bcrypt.js** (for password hashing)

**## Installation & Setup**

**Packages used in this project**

"bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "email-validator": "^2.0.4",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.12.2",
    "nodemon": "^3.1.9"

**### Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (v16+ recommended)
- **MongoDB** (running locally or on Atlas)

**### Steps to Run**

**#### 1. Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

**#### 2. Install Dependencies**
Navigate to both **frontend** and **backend** folders and install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

**#### 3. Set Up Environment Variables**
Create a `.env` file in the backend directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**#### 4. Run the Backend Server**
```bash
cd backend
npm start
```
The backend will run at `http://localhost:5000`

**#### 5. Run the Frontend**
```bash
cd frontend
npm run dev
```
The frontend will run at `http://localhost:5173`

**## API Endpoints**

**### Authentication Routes**

**#### 1. User Signup**
**Endpoint:** `POST /signup`
- **Request Body:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "bio": "Tech Enthusiast",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
- **Response:**
```json
{
  "message": "User registered successfully"
}
```

**#### 2. User Login**
**Endpoint:** `POST /login`
- **Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

**### Protected Route**

**#### 3. Fetch User Data**
**Endpoint:** `GET /user`
- **Headers:**
```json
{
  "Authorization": "Bearer jwt_token_here"
}
```
- **Response:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "bio": "Tech Enthusiast",
  "email": "johndoe@example.com"
}
```

**## Security Measures**
- **Password Hashing**: Uses `bcrypt.js` to hash passwords before storing them in the database.
- **JWT Authentication**: Securely authenticates users and protects routes.
- **Middleware Validation**: Ensures that all required fields are provided in API requests.

**## Folder Structure**
```
project-root/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── .env
│   ├── package.json
│
│── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│
│── README.md
```

**## Future Enhancements**
- Add **profile picture upload** functionality.
- Implement **forgot password** and **email verification**.
- Improve UI with **animations** and **better styling**.

**## Contributors**
- **Your Name** (your.email@example.com)

**## License**
This project is licensed under the **MIT License**.

