import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { uploadFile, listGroupFiles, deleteFile, softDeleteFile, permanentlyDeleteFile, getTrashedFiles, restoreFile } from '../controllers/fileController.js';
import upload from '../middleware/upload.js';


const router = express.Router();
router.post('/:groupId/upload', protect, upload.single('file'), uploadFile);
router.get('/:groupId/files', protect, listGroupFiles);
router.delete('/:id', protect, deleteFile);
router.delete('/:id/trash', protect, softDeleteFile);
router.get('/trash', protect, getTrashedFiles);
router.put('/:id/restore', protect, restoreFile);
router.delete('/:id/permanent', protect, permanentlyDeleteFile);

export default router;
