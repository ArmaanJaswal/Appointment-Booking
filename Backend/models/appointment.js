import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        deafult:"",
    },
    date:{
        type:String,
        required:true,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["scheduled","completed","cancelled"],
        deafult:"scheduled",
    }
},
{timestamps:true});

appointmentSchema.index({date:1,status:1});

export default mongoose.model('Appointment',appointmentSchema);