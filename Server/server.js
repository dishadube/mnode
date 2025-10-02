import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import studentRoutes from './routes/studentRoutes.js'


dotenv.config();
const app = express();


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));


app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/service",serviceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/student",studentRoutes);



app.listen(process.env.PORT ,() => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});


//Server.js
