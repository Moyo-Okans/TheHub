import Group from '../models/Group.js';
import notifyMember from '../utils/notifyMember.js';



export const createGroup = async (req, res) => {
  try {
    const { courseCode, title } = req.body;
    const userId = req.user.id;

    // Check if a group with the same title already exists
    const existingGroup = await Group.findOne({ title });
    if (existingGroup) {
      return res.status(409).json({ error: 'Group name already exists.' });
    }

    const newGroup = await Group.create({
      courseCode,
      title,
      createdBy: userId,
      members: [userId],
    });

    res.status(201).json(newGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create group.' });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });

    const userId = req.user.id;
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.json({ message: 'Joined group successfully', group });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join group.' });
    console.error(err);
  }
};


export const getMyGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    const groups = await Group.find({
      members: userId,
    });

    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching groups' });
  }
};


export const getGroupMembers = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findById(groupId).populate('members', 'username email'); // customize fields

    if (!group) return res.status(404).json({ message: 'Group not found' });

    res.json(group.members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching group members' });
  }
};


export const inviteCollaboratorToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId, role } = req.body; // ID of user to invite + their role

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Only group creator or admin should be able to invite
    if (!group.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Check if already a collaborator
    const alreadyAdded = group.collaborators.some(
      (collab) => collab.user.toString() === userId
    );

    if (alreadyAdded) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    // Add collaborator
    group.collaborators.push({ user: userId, role: role || 'viewer' });
    await group.save();

    // Send notification to the invited user
    await notifyMember({
      userId,
      message: `You've been invited to collaborate on "${group.title}".`,
      type: 'invite',
      relatedGroup: group._id
    });

    res.status(200).json({ message: 'Collaborator invited successfully' });
  } catch (error) {
    console.error('Invite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/groupController.js
export const removeCollaboratorFromGroup = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Check permission
    if (!group.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the group creator can remove collaborators' });
    }

    const beforeLength = group.collaborators.length;

    // Filter out the collaborator
    group.collaborators = group.collaborators.filter(
      (collab) => collab.user.toString() !== userId
    );

    if (group.collaborators.length === beforeLength) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    await group.save();

    res.status(200).json({ message: 'Collaborator removed successfully' });
  } catch (error) {
    console.error('Remove collaborator error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAllCollaborators = async (req, res) => {
  const currentUserId = req.user._id;

  try {
    // Find groups where the current user is a member or collaborator
    const groups = await Group.find({
      $or: [
        { createdBy: currentUserId },
        { 'collaborators.user': currentUserId }

      ]
    }).populate('collaborators.userId', 'name email');

    const collaboratorMap = new Map();

    for (const group of groups) {
      for (const collab of group.collaborators) {
        const collabId = collab.userId._id.toString();
        if (collabId === currentUserId.toString()) continue; // exclude current user

        if (!collaboratorMap.has(collabId)) {
          collaboratorMap.set(collabId, {
            user: {
              _id: collab.userId._id,
              name: collab.userId.name,
              email: collab.userId.email,
            },
            groups: [],
          });
        }

        collaboratorMap.get(collabId).groups.push({
          groupId: group._id,
          groupName: group.name,
          role: collab.role,
        });
      }
    }

    const collaborators = Array.from(collaboratorMap.values());
    res.status(200).json({ collaborators });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch collaborators' });
  }
};
