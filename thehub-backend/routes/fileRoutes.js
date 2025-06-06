import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { listGroupFiles, deleteFile, softDeleteFile, permanentlyDeleteFile, getTrashedFiles, restoreFile, uploadGroupFile, uploadIndependentFile, listIndependentFiles,  getUserFiles,uploadUserFile, downloadFile } from '../controllers/fileController.js';
import upload from '../middleware/upload.js';


const router = express.Router();
// Upload to group
router.post('/:groupId/upload', protect, upload.single('file'), uploadGroupFile);
router.post('/upload', protect, upload.single('file'), uploadIndependentFile); 
router.get('/:groupId/files', protect, listGroupFiles);
router.get('/files', protect, listIndependentFiles);
router.delete('/:id', protect, deleteFile);
 // Added download route for the file download by
router.get('/:id/download', protect, downloadFile);
router.delete('/:id/trash', protect, softDeleteFile);
router.get('/trash', protect, getTrashedFiles);
router.put('/:id/restore', protect, restoreFile);
router.delete('/:id/permanent', protect, permanentlyDeleteFile);
router.get('/my-files', protect, getUserFiles);
router.post('/uploadUserFile', protect, upload.single('file'), uploadUserFile);

export default router;
