// utils/notifyMember.js
import Notification from '../models/Notification.js';

/**
 * Notify a specific user
 * @param {Object} params
 * @param {String} params.userId - ID of the user to notify
 * @param {String} params.message - Notification message
 * @param {String} [params.type] - Type of notification (e.g. 'invite', 'file')
 * @param {String} [params.relatedGroup] - Optional Group ID
 * @param {String} [params.relatedFile] - Optional File ID
 */
const notifyMember = async ({ userId, message, type = 'general', groupId = null, relatedFile = null }) => {
  try {
    const notification = new Notification({
      user: userId,
      message,
      type,
      groupId,
      relatedFile
    });

    await notification.save();
  } catch (error) {
    console.error('Error sending notification:', error.message);
  }
};

export default notifyMember;
