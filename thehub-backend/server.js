import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import groupRoutes from './routes/groupRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import connectDB from "./config/db.js";
import 'dotenv/config'


// App Config
const app = express();
const port = process.env.PORT || 5000
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/files', fileRoutes);


// Start the server


app.listen(port, () => console.log(`Server running on port ${port}`));