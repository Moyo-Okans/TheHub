// utils/activityLogger.js
import ActivityLog from '../models/ActivityLog.js';

export const logActivity = async ({ fileId, userId, action }) => {
  try {
    const log = new ActivityLog({ fileId, userId, action });
    await log.save();
  } catch (error) {
    console.error('Failed to log activity:', error.message);
  }
};
