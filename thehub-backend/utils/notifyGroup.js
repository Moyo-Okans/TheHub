// utils/notifyGroup.js
import Notification from '../models/Notification.js';
import Group from '../models/Group.js';

export const notifyGroupMembers = async ({ groupId, senderId, message }) => {
  try {
    const group = await Group.findById(groupId).populate('members', '_id');
    if (!group) return;

    const recipientIds = group.members
      .map(m => m._id.toString())
      .filter(id => id !== senderId); // Don't notify self

    const notifications = recipientIds.map(recipient => ({
      recipient,
      message,
      groupId,
    }));

    await Notification.insertMany(notifications);
  } catch (error) {
    console.error('Failed to send notifications:', error.message);
  }
};
