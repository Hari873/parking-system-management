# 🚗 Parking Management System

A robust full-stack solution built utilizing the **MERN (MongoDB, Express, React, Node.js)** architecture designed to seamlessly oversee and automate parking facility operations. 

## 🌟 Key Features

* **Intelligent Slot Assignment:** Automatically processes incoming vehicles and assigns the nearest available valid parking slot based on vehicle type (Car, Bike, or Truck).
* **Automated Toll Calculation:** Built-in dynamic engine algorithm that computes exact toll charges upon exit scaling with duration limits and varying pricing per vehicle classification.
* **Real-time Monitoring:** Global visibility table displaying all current active slots seamlessly populated into the React Frontend.
* **Specific Slot Retrieval:** Instantly query specific parking spots using the Read Slot endpoint to discover occupied statuses and track live receipt/ticket details.
* **RESTful Architecture:** Modern schema adhering strictly to precise HTTP method paradigms (POST for allocations, PATCH for exit closures).

---

## 🛠️ Tech Stack Used

### Frontend
- **React.js** (Vite Framework)
- **React Router** for App Navigation
- **Axios** (API integration)
- Plain HTML Form architectures & pure inline CSS

### Backend 
- **Node.js** & **Express.js** 
- **MongoDB** with **Mongoose** (Database modeling)
- **Joi** (Model Schemas and Validation checks)
- **JSON Web Tokens (JWT)** (Middleware Auth validation structure)
- **Morgan** (Logging Server Activity)

---

## 🚀 Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites
Make sure you have Node and MongoDB securely installed locally on your system.
- Start the MongoDB Instance natively: Make sure your `127.0.0.1:27017` is active.

### 1. Installation

Clone down the repository to a local directory:
```bash
git clone https://github.com/Hari873/parking-system-management.git
cd parking-system-management
```

### 2. Backend Setup
Navigate into the backend and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file inside the strictly `backend` directory mapping these keys:
```env
PORT = "3600"
DB_URL = "mongodb://127.0.0.1:27017/parking-management-system"
JWT_SECRET = "your_secret_key_here"
```

Start the backend API server securely utilizing nodemon:
```bash
nodemon index.js
```

### 3. Frontend Setup
Open up a brand new fresh terminal window, navigate into the frontend, and boot up the UI:
```bash
cd frontend
npm install
npm run dev
```

Your system UI should immediately pop open and automatically resolve any backend endpoints seamlessly resolving to `localhost:3600`.

---

👤 Developed by **Hari Krishna**
