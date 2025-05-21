import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
// Ensure dotenv is loaded

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("DB URI:", process.env.MONGODB_URI);

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
