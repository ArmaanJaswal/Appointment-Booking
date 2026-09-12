import express from 'express'
import Appointment from '../models/appointment.js';

// Helper to normalize time to 24-hour "HH:mm" with leading zero
const normalizeTime = (timeStr) => {
    if (!timeStr) return "";
    let clean = timeStr.trim();
    
    // Check for 12-hour format with AM/PM (e.g., "9:00 AM", "02:30 PM")
    const match12 = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match12) {
        let [_, h, m, period] = match12;
        let hours = parseInt(h, 10);
        if (period.toUpperCase() === "PM" && hours < 12) hours += 12;
        if (period.toUpperCase() === "AM" && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, "0")}:${m}`;
    }

    // Check for 24-hour format (e.g., "9:00" -> "09:00", "14:30")
    const parts = clean.split(":");
    if (parts.length >= 2) {
        const h = parts[0].padStart(2, "0");
        const m = parts[1].padStart(2, "0");
        return `${h}:${m}`;
    }

    return clean;
};

const createAppointment = async(req,res)=>{
    try{
        let {title,description,date,startTime,endTime}= req.body;
    
        if(!title || !date || !startTime || !endTime){
           return res.status(400).json({message:"Enter all the fields"});
        }

        date = date.trim();
        startTime = normalizeTime(startTime);
        endTime = normalizeTime(endTime);

        if(endTime<=startTime){
            return res.status(400).json({message:"End time must be after start time"});
        }

        const conflict = await Appointment.findOne({
            date,
            status:{$ne:'cancelled'},
            startTime:{$lt:endTime},
            endTime:{$gt:startTime},
        });

        if(conflict){
            return res.status(409).json({message:"There is a time slot conflict"});
        }

        const newAppointment = new Appointment({
            title: title.trim(),
            description: description ? description.trim() : "",
            date,
            startTime,
            endTime
        });
    
        const savedAppointment = await newAppointment.save();
    
        res.status(201).json({message:"Appointment saved successfully",appointment:savedAppointment});
    }catch(err){
        res.status(400).json({message:"Internal Server Error",err});
    }
}


const getAppointments = async(req,res)=>{
    try{
        const {date,status}= req.query;

        const filter ={};
        if(date) filter.date=date;
        if(status) filter.status= status;

        const appointments = await Appointment.find(filter).sort({date:1,startTime:1});

        res.status(200).json({appointments});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to fetch appointments"});
    }
}


const getAppointmentById=async (req,res)=>{
    try{
        const id = req.params.id;

        const appointment = await Appointment.findById(id);

        if(!appointment){
            return res.status(404).json({message:"Appointment Not Found"});
        }

        return res.status(200).json({appointment});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Invalid Appointment ID"});
    }
}


const updateAppointment = async(req,res)=>{
    try{
        const {id} = req.params;
        let {title,description,date,startTime,endTime}= req.body;

        if(!title || !date || !startTime || !endTime){
            return res.status(400).json({message:"Enter all the fields"});
        }

        date = date.trim();
        startTime = normalizeTime(startTime);
        endTime = normalizeTime(endTime);

        if(endTime<=startTime){
            return res.status(400).json({message:"End Time must be after Start Time"});
        }

        const existing = await Appointment.findById(id);
        if(!existing){
            return res.status(404).json({message:"Appointment not Found"});
        }

        const conflict = await Appointment.findOne({
            _id:{$ne:id},
            date,
            status:{$ne:'cancelled'},
            startTime:{$lt:endTime},
            endTime:{$gt:startTime},
        });

        if(conflict){
            return res.status(409).json({message:"There is a time slot conflict"});
        }

        existing.title=title.trim();
        existing.description=description ? description.trim() : "";
        existing.date=date;
        existing.startTime=startTime;
        existing.endTime=endTime;

        const updated = await existing.save();

        return res.status(200).json({message:"Appointment updated successfully",appointment:updated});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}


const updateStatus=async(req,res)=>{
    try{
        const {id} = req.params;
        const {status}= req.body;

        const allowedStatuses = ['completed','cancelled'];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({message:"Status must be completed or cancelled"});
        }

        const appointment = await Appointment.findById(id);

        if(!appointment){
            return res.status(404).json({message:"Appointment not found"});
        }

        if(appointment.status==="cancelled"){
            return res.status(409).json({message:"Cannot change status of a cancelled appointment"});
        }

        appointment.status=status;
        const updated = await appointment.save();

        return res.status(200).json({message:"Appointment status changed",appointment:updated});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export{createAppointment,getAppointments,getAppointmentById,updateAppointment,updateStatus}