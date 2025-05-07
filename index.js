import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import router from './src/routes/user.js'
const app=express();
dotenv.config();

app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.json());    
connectDB();

app.use('/api/user',router);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);

