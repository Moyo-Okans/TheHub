import express from 'express';
import { createGroup, joinGroup, getGroupMembers, getMyGroups, inviteCollaboratorToGroup, removeCollaboratorFromGroup, getAllCollaborators,getGroupById, softDeleteGroup,getTrashedGroups, } from '../controllers/groupController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createGroup);
router.post('/:groupId/join', protect, joinGroup);
router.get('/my-groups', protect, getMyGroups)
router.get('/:id/members', protect, getGroupMembers);
router.post('/:groupId/invite', protect, inviteCollaboratorToGroup);
router.delete('/:groupId/collaborators/:userId', protect, removeCollaboratorFromGroup);
router.get('/collaborators', protect, getAllCollaborators);
router.delete('/:id', protect, softDeleteGroup);
router.get('/trash', protect, getTrashedGroups);
router.get('/:groupId', protect, getGroupById);
//router.delete('/:id', protect, deleteGroup);



export default router;
