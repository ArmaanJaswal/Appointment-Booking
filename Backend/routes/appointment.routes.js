import express from 'express'
import Appointment from '../models/appointment.js'
import { createAppointment, getAppointmentById, getAppointments, updateAppointment, updateStatus } from '../controllers/appointment.controller.js';

const router = express.Router();
router.post("/",createAppointment);
router.get("/",getAppointments);
router.get("/:id",getAppointmentById);
router.put("/:id",updateAppointment);
router.patch("/:id/status",updateStatus);


export default router;  