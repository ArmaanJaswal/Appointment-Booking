# 📅 Team Appointment Booking Application

A modern, full-stack web application designed for teams to seamlessly schedule, manage, track, and update appointments with real-time overlap conflict detection, dynamic search/filters, and status tracking.

---

## 🚀 Features

- **Dashboard & Status Overview**: Live metrics displaying total, scheduled, completed, and cancelled appointments with one-click filtering.
- **Appointment Scheduling & Management**:
  - Create new appointments with title, description, date, start time, and end time.
  - Edit existing appointment details with pre-filled forms.
  - Mark appointments as **Completed** or **Cancelled** with built-in safety confirmation popups.
- **Smart Time Conflict Detection**: Backend validation checks for overlapping time slots on the same date and prevents double-booking.
- **Live Search & Date Filters**: Instant client-side filtering by appointment title/description or specific date with a one-click filter reset.
- **12-Hour AM/PM Time Format**: Clean 12-hour time representation on cards and modal displays while maintaining standardized 24-hour storage in the database.
- **Responsive & Clean UI**: Built with Tailwind CSS, supporting mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 + Vite
- **Routing**: React Router (v7/v8)
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios

### **Backend**
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Utilities**: `dotenv` for environment management, `cors` for cross-origin resource sharing

---

## 📂 Project Structure

```
Team Appointment Application/
├── Backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection logic
│   ├── controllers/
│   │   └── appointment.controller.js # CRUD & conflict validation logic
│   ├── models/
│   │   └── appointment.js         # Mongoose appointment schema
│   ├── routes/
│   │   └── appointment.routes.js  # Express route definitions
│   ├── index.js                   # Backend server entrypoint
│   ├── seed.js                    # Sample data seeder script
│   ├── package.json
│   └── .env                       # Backend environment variables
│
├── Frontend/
│   ├── pages/
│   │   └── MainPage.jsx           # Main appointments dashboard & search
│   ├── Routes/
│   │   └── AppRoutes.jsx          # Route configurations
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AppointmentDisplay.jsx # Individual appointment card & modal
│   │   │   ├── AppointmentForm.jsx    # Create appointment form
│   │   │   ├── EditAppointmentForm.jsx# Edit appointment form
│   │   │   └── StatusPanel.jsx        # Stats overview panel
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started & Installation

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **MongoDB Atlas Connection URI** or a local MongoDB instance

---

### 2. Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend/` folder with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   ```

4. *(Optional)* Seed sample appointments to MongoDB:
   ```bash
   node seed.js
   ```

5. Start the backend server:
   ```bash
   # Development mode (with nodemon or node)
   node index.js
   ```
   > The server will start on `http://localhost:5000`.

---

### 3. Frontend Setup

1. Navigate to the `Frontend` directory:
   ```bash
   cd ../Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Frontend/` folder:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   > Open your browser and navigate to `http://localhost:5173`.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api/appointments`

| Method  | Endpoint               | Description                                        | Request Body |
|---------|------------------------|----------------------------------------------------|--------------|
| `GET`   | `/`                    | Fetch all appointments (supports `?date=` & `?status=`) | None |
| `GET`   | `/:id`                 | Fetch a single appointment by ID                   | None |
| `POST`  | `/`                    | Create a new appointment (validates time conflicts)| `{ title, description, date, startTime, endTime }` |
| `PUT`   | `/:id`                 | Update an existing appointment                     | `{ title, description, date, startTime, endTime }` |
| `PATCH` | `/:id/status`          | Update appointment status (`completed` / `cancelled`)| `{ status: "completed" \| "cancelled" }` |

---

## 🛡️ Business Logic & Validations

- **Time Order**: `endTime` must be strictly after `startTime`.
- **Slot Conflict**: Detects overlapping intervals (`startTime < existing.endTime && endTime > existing.startTime`) on the same date for active appointments.
- **Cancelled Protection**: Cancelled appointments cannot have their status updated or be edited.
- **Completed Protection**: Completed appointments cannot be edited or cancelled.

---

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
