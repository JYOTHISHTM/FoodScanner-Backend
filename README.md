# 🚀 Food Scanner Backend

## 📌 Overview
The Food Scanner Backend is a **Node.js + Express.js** application that powers the Food Scanner App. It processes barcode data, fetches food product details, analyzes ingredients, calculates a personalized health score, and manages user data.

The backend follows a **Modular Monolith Architecture** with **Domain-Driven Design (DDD)** principles to ensure scalability, maintainability, and clean code structure.

---

## 🧠 Architecture

### 🔹 Pattern Used
- Modular Monolith  
- Domain-Driven Design (DDD)

### 🔹 Module Structure
Each module is independently organized into:
- `application` → Business logic (services)  
- `domain` → Entities / models  
- `infrastructure` → Database + repository layer  
- `interface` → Controllers + routes  

---

## 📦 Modules
- Auth  
- User  
- Product  
- Scan  
- History  
- Favorite  
- Admin  

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose)  

### 🔐 Authentication
- JWT  
- Google OAuth  
- Email OTP  

### 🌐 External API
- OpenFoodFacts API  

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/FoodScanner

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

ADMIN_EMAIL=admin@foodscanner.com
ADMIN_PASSWORD=Admin@12345
```

---

## 📂 Project Structure

```bash
src/
│
├── core/
│   └── config/
│       ├── db.ts
│       └── seedAdmin.ts
│
├── modules/
│   ├── auth/
│   ├── user/
│   ├── product/
│   ├── scan/
│   ├── history/
│   ├── favorite/
│   └── admin/
│
└── routes/
    └── index.ts
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run the server
```bash
npm run dev
```

### 3️⃣ Server runs on
```
http://localhost:4000
```

---

## 🔄 Core Workflow

1. User scans barcode / enters manually  
2. Frontend sends request to backend  
3. Backend fetches product data from OpenFoodFacts API  
4. Backend analyzes:
   - Ingredients  
   - Nutrition  
   - Harmful content  
5. Health score is calculated  
6. Response is sent to frontend  
7. Data stored in MongoDB (history, favorites)  

---

## 📊 Features

### 👤 User
- Register & Login (Google + OTP)  
- Profile management  
- Allergy tracking  
- Scan history  
- Favorites management  

### 📦 Product
- Fetch product via barcode  
- Nutrition analysis  
- Ingredient breakdown  
- Harmful content detection  

### ❤️ Favorites
- Add/remove favorite products  

### 📜 History
- Store scanned products  
- Track food safety score  

### 🔐 Admin
- Admin login  
- Block / Unblock users  

---

## 🧮 Health Score Logic

Health score is calculated based on:
- Sugar level  
- Fat content  
- Additives  
- Harmful ingredients  
- User allergies  

⚠️ **Lower score → Less healthy product**

---

## 🔐 Security
- JWT Authentication  
- Google OAuth Login  
- Email OTP verification  
- Role-based access (Admin/User)  

---

## 🌐 API Base URL

```
http://localhost:4000/api
```

---

## 📌 Example Endpoints

| Method | Endpoint           | Description             |
|--------|-------------------|-------------------------|
| GET    | /product/:barcode | Get product details     |
| POST   | /auth/login       | User login              |
| POST   | /auth/register    | User registration       |
| GET    | /history          | Get scan history        |
| POST   | /favorite         | Add to favorites        |

---

## 🧪 Future Improvements
- AI-based food recommendations  
- Advanced nutrition scoring  
- Multi-language support  
- Mobile app integration  

---

## 👨‍💻 Author

**Jyothish T M**
