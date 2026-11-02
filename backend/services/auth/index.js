import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const port=process.env.PORT || 8001;

const app=express();

app.get('/',(req,res)=>{
    res.send('Hello auth');
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log('Server is running on port ' + port);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

startServer();