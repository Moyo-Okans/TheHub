import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/users', userRoutes);


// Connect to MongoDB
connectDB();
// Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));