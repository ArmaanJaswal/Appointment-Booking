import express from "express"
import router from "./routes/appointment.routes.js";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import cors from 'cors'
dotenv.config();
const app = express();


app.use(
    cors({
        origin:process.env.FRONTEND_URL,
    })
)
app.use(express.json());
app.use("/api/appointments",router);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});