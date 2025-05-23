import express from 'express';
import { createGroup, joinGroup, getGroupMembers, getMyGroups, inviteCollaboratorToGroup, removeCollaboratorFromGroup, getAllCollaborators} from '../controllers/groupController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createGroup);
router.post('/:groupId/join', protect, joinGroup);
router.get('/my-groups', protect, getMyGroups)
router.get('/:id/members', protect, getGroupMembers);
router.post('/:groupId/invite', protect, inviteCollaboratorToGroup);
router.delete('/:groupId/collaborators/:userId', protect, removeCollaboratorFromGroup);
router.get('/collaborators', protect, getAllCollaborators);


export default router;
