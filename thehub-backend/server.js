import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./utils/cloudinary.js"; 
import "dotenv/config";
import morgan from 'morgan'; 

// App Config
const app = express();
const port = process.env.PORT || 5000; 
connectDB();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

// Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/files", fileRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send("API WORKING");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
