// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: { type: String, default: 'general' }, // e.g. 'file', 'invite', etc
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  relatedFile: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Notification', notificationSchema);
