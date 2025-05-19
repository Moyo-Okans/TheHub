import express from 'express';
import { createGroup, joinGroup } from '../controllers/groupController.js';
import { uploadFile, listGroupFiles } from '../controllers/fileController.js';
import upload from '../middleware/upload.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createGroup);
router.post('/:groupId/join', authMiddleware, joinGroup);
router.post('/:groupId/upload', authMiddleware, upload.single('file'), uploadFile);
router.get('/:groupId/files', authMiddleware, listGroupFiles);

export default router;
