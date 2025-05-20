import express from 'express';
import { toggleStarGroup, toggleStarFile, getStarredItems } from '../controllers/starController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/star-group/:groupId', protect, toggleStarGroup);
router.post('/star-file/:fileId', protect, toggleStarFile);
router.get('/starred', protect, getStarredItems);

export default router;
