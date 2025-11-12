# 🏡 Buyer–Seller Registration System (MERN Stack)

A full-stack web application built using **React, Node.js, Express, MongoDB, and Nodemailer** that allows Buyers and Sellers to register, save their details in a database, and send automatic confirmation emails.

---

## 🚀 Features

### 👥 Buyer Module
- Buyer registration form with validation  
- Stores buyer data in MongoDB  
- Sends confirmation email to the buyer  
- Sends notification email to the admin  

### 🏪 Seller Module
- Seller registration form with validation  
- Stores seller data in MongoDB  
- Sends confirmation email to the seller  
- Sends notification email to the admin  

---

## 🛠️ Technologies Used

| Category | Technologies |
|-----------|--------------|
| Frontend | React.js, Axios, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Email Service | Nodemailer (Gmail SMTP) |
| Deployment | GitHub Pages (Frontend) & Render (Backend) |

---

## 📂 Project Structure

task/
│
├── buyer-seller-frontend/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── BuyerRegister.jsx
│ │ │ ├── SellerRegister.jsx
│ │ │ ├── Login.jsx
│ │ └── App.js
│ └── package.json
│
└── buyer-seller-backend/ # Node + Express Backend
├── models/
│ ├── Buyer.js
│ ├── Seller.js
├── routes/
│ ├── buyerRoutes.js
│ ├── sellerRoutes.js
├── controllers/
│ ├── buyerController.js
│ ├── sellerController.js
├── server.js
└── .env

⚙️ 2. Backend setup
cd buyer-seller-backend
- npm install

Create a .env file in buyer-seller-backend/ and add:

MONGO_URI=mongodb://127.0.0.1:27017/buyerSellerDB
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000


Run backend:
- npm start

💻 3. Frontend setup
cd ../buyer-seller-frontend
- npm install
- npm start
