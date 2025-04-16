# 🏥 Real-Time Hospital Queue Management System

This project is a real-time hospital queue management system built with **Node.js**, **Express**, and **Socket.io**. It handles patients based on triage levels (1 to 5) and provides:

- 🚨 Alerts when a **critical patient** arrives
- ⏱ Estimated **wait time** for each patient
- ⚠️ Notifications when **staffing thresholds** are exceeded

---

## 🚀 Features

- Real-time patient updates using **Socket.io**
- REST API to:
  - Add new patients
  - Get current queue
  - Treat and discharge patients
- Priority queue based on **triage level**
- Critical patient alerts on the frontend
- Estimated wait time display
- Configurable patient-to-staff ratio warnings

---

## 🧰 Tech Stack

| Tech        | Description                  |
|-------------|------------------------------|
| Node.js     | JavaScript runtime           |
| Express.js  | Web framework                |
| Socket.io   | Real-time bidirectional comm |
| Joi         | Schema validation            |
| HTML/CSS    | Simple frontend client       |

---

## ⚙️ Setup Instructions

 **Clone the repository**  
   ```bash
   git clone https://github.com/shiva177/Patient_Management.git
   cd health-management

