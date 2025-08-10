# 🏫 School Management API

A Node.js + Express.js + MySQL API to manage school data.  
Features:
- Add new schools
- Retrieve a list of schools sorted by proximity to a given location
- Fully RESTful endpoints
- Ready to deploy on Railway or any Node hosting platform

---

## 📌 Features
1. **Add School**
   - Validates incoming data
   - Stores school name, address, latitude, and longitude in MySQL

2. **List Schools**
   - Accepts user's latitude and longitude as query params
   - Calculates distance to each school using the Haversine formula
   - Returns results sorted by nearest first

---

## 🛠️ Tech Stack
- **Node.js** (Runtime)
- **Express.js** (Server framework)
- **MySQL** (Database)
- **dotenv** (Environment variables)
- **Nodemon** (Dev auto-reload)

---

## 📂 Project Structure

```bash
├── routes/
│ └── schoolRoutes.js # API routes
├── controllers/
│ └── schoolController.js # API logic
├── db/
│ └── db.js # MySQL connection
├── server.js # App entry point
├── .env # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Setup MySQL Database
Run the following SQL to create the database and table:
```
CREATE DATABASE school_db;

USE school_db;

CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

4️⃣ Configure Environment Variables
Create a .env file:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_db
```
5️⃣ Run Locally
```
npm run server
```

📡 API Endpoints
1. Add School
POST /addSchool


```json
{
  "name": "Greenwood High",
  "address": "123 Main St",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```
Response:

```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```
2. List Schools
GET /listSchools?latitude=12.9716&longitude=77.5946

Response:

```json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Main St",
    "distance_km": 1.24
  }
]
```
