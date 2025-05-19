import Group from '../models/Group.js';
import User from '../models/User.js';

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
    res.status(500).json({ error: 'Failed to create group.' });
    console.error(err);
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
