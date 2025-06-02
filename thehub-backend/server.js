import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import morgan from 'morgan';

// App Config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

// Middlewares
//cors configuration

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev')); 

// Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/groups", fileRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send("API WORKING");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });
});


// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
