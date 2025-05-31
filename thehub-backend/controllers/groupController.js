import Group from '../models/Group.js';
import notifyMember from '../utils/notifyMember.js';

// CREATE GROUP
export const createGroup = async (req, res) => {
  try {
    const { courseCode, title } = req.body;
    const userId = req.user.id;

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

// JOIN GROUP
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
    console.error(err);
    res.status(500).json({ error: 'Failed to join group.' });
  }
};

// GET MY GROUPS
export const getMyGroups = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({ members: userId });
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching groups' });
  }
};

// GET GROUP MEMBERS
export const getGroupMembers = async (req, res) => {
  try {
    const groupId = req.params.id;
    const group = await Group.findById(groupId).populate('members', 'username email');
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json(group.members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching group members' });
  }
};

// GET GROUP BY ID
export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members', 'username email');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json({
      id: group._id,
      title: group.title,
      courseCode: group.courseCode,
      createdBy: group.createdBy,
      members: group.members,
      collaborators: group.collaborators || [],
      createdAt: group.createdAt,
    });
  } catch (error) {
    console.error('getGroupById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// INVITE COLLABORATOR
export const inviteCollaboratorToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId, role } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (!group.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const alreadyAdded = group.collaborators.some(
      (collab) => collab.user.toString() === userId
    );

    if (alreadyAdded) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    group.collaborators.push({ user: userId, role: role || 'viewer' });
    await group.save();

    await notifyMember({
      userId,
      message: `You've been invited to collaborate on "${group.title}".`,
      type: 'invite',
      relatedGroup: group._id,
    });

    res.status(200).json({ message: 'Collaborator invited successfully' });
  } catch (error) {
    console.error('Invite error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// REMOVE COLLABORATOR
export const removeCollaboratorFromGroup = async (req, res) => {
  const { groupId, userId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (!group.createdBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only the group creator can remove collaborators' });
    }

    const beforeLength = group.collaborators.length;
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

// GET ALL COLLABORATORS
export const getAllCollaborators = async (req, res) => {
  const currentUserId = req.user._id;

  try {
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
        if (collabId === currentUserId.toString()) continue;

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
