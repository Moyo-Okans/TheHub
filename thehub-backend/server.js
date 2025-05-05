const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});
  
app.get("/", (req, res) => {
  res.send("Welcome to The Hub Backend!");
});


const mongoURI =
  "mongodb+srv://olukayodelolade:05TheHub2020@moyoshub.md6ilwj.mongodb.net/?retryWrites=true&w=majority&appName=Moyoshub";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start the server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


