import express from 'express';
import protect from '../middleware/authMiddleware';
import User from '../models/User';

const router = express.Router();

//Get user profile
router.get('/profile', protect, async (req,res) => {
    
    if(!req.User){
        return res.status(404).json({message:'User not found'});
    }
    res.json({
        id:req.user._id,
        fullname:req.user.fullname,
        email:req.user.email,
    });
});

export default router;