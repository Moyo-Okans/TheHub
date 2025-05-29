// Import User model
import User from "../models/User.js";

import jwt from "jsonwebtoken";
// User signup
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const user = new User({
            fullname,
            email,
            password,
        });
        await user.save();
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '30d' });
        res.status(201).json({ message: 'User registered successfully', fullname:user.fullname, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// User login

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Check if the password is correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({
            message: 'Login successful', token, user: {
                id: user._id,
                fullname: user.fullname
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // get User Profile
};