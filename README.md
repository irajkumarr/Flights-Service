# ✈️ Flight Service

This project is a **Flight Service Backend** that manages **Airplanes, Cities, Airports, and Flights**.  
It is built with **Node.js, Express.js, PostgreSQL, and Prisma ORM**, following best practices for scalability and maintainability.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework for APIs  
- **PostgreSQL** – Relational database  
- **Prisma ORM** – Database modeling & queries  
- **Nodemon** – Development auto-reload  
- **dotenv** – Environment variable management  

---

## 📂 Project Structure

flight-service/
├── prisma/ # Prisma schema & migrations
│ ├── schema.prisma
│ └── seed.js
├── src/
│ ├── config/ # DB & app configuration
│ ├── controllers/ # Request handlers
│ ├── repositories/ # DB operations using Prisma
│ ├── routes/ # Express routes
│ ├── services/ # Business logic
│ └── index.js # Entry point
├── .env # Environment variables
├── package.json

---

## 📌 API Endpoints
# ✈️ Airplanes

POST /api/v1/airplanes → Create airplane

GET /api/v1/airplanes → Get all airplanes

GET /api/v1/airplanes/:id → Get airplane by ID

PUT /api/v1/airplanes/:id → Update airplane

DELETE /api/v1/airplanes/:id → Delete airplane

# 🏙 Cities

POST /api/v1/cities → Create city

GET /api/v1/cities → Get all cities

# 🛫 Airports

POST /api/v1/airports → Create airport

GET /api/v1/airports → Get all airports

# 🛩 Flights

POST /api/v1/flights → Create flight

GET /api/v1/flights → Get all flights

GET /api/v1/flights/:id → Get flight by ID

PUT /api/v1/flights/:id → Update flight

DELETE /api/v1/flights/:id → Delete fligh
