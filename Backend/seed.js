// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './models/appointment.js'

dotenv.config();

const sample = [
  { title: "Team standup", description: "Daily sync", date: "2026-09-15", startTime: "09:00", endTime: "09:15" },
  { title: "Client call — Acme Co", description: "Proposal walkthrough", date: "2026-09-15", startTime: "10:00", endTime: "10:30" },
  { title: "Design review", description: "", date: "2026-09-16", startTime: "14:00", endTime: "15:00", status: "completed" },
  { title: "Vendor meeting", description: "Rescheduled", date: "2026-09-17", startTime: "11:00", endTime: "11:30", status: "cancelled" },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Appointment.deleteMany({});
  await Appointment.insertMany(sample);
  console.log('Seeded');
  process.exit();
};

run();