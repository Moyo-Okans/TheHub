import File from '../models/File.js';
import Group from '../models/Group.js';
import { logActivity } from '../utils/activityLogger.js';
import { notifyGroupMembers } from '../utils/notifyGroup.js';



export const uploadGroupFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file received. Make sure the field name is "file".' });
    }

    const { title, tags } = req.body;
    const groupId = req.params.groupId;
    const userId = req.user.id;

    const groupExists = await Group.findById(groupId);
    if (!groupExists) {
      return res.status(404).json({ error: 'Group not found.' });
    }

    const fileType = req.file.mimetype;

    const newFile = await File.create({
      title,
      fileType,
      fileUrl: req.file.path,
      groupId,
      uploadedBy: userId,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    await logActivity({
      fileId: newFile._id,
      userId,
      action: 'uploaded',
    });

    await notifyGroupMembers({
      groupId,
      senderId: userId,
      message: `${req.user.name || 'Someone'} uploaded a file: "${title}"`,
    });

    res.status(201).json(newFile);
  } catch (error) {
    console.error('UPLOAD GROUP FILE ERROR:', error);
    res.status(500).json({ error: 'Failed to upload file to group.' });
  }
};

export const uploadIndependentFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file received. Make sure the field name is "file".' });
    }

    const { title, tags } = req.body;
    const userId = req.user.id;

    const fileType = req.file.mimetype;

    const newFile = await File.create({
      title,
      fileType,
      fileUrl: req.file.path,
      uploadedBy: userId,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    await logActivity({
      fileId: newFile._id,
      userId,
      action: 'uploaded',
    });

    res.status(201).json(newFile);
  } catch (error) {
    console.error('UPLOAD INDEPENDENT FILE ERROR:', error);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
};



export const listGroupFiles = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const files = await File.find({ groupId }).sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    console.error('LIST GROUP FILES ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch group files.' });
  }
};

export const listIndependentFiles = async (req, res) => {
  try {
    const files = await File.find({ groupId: { $exists: false } }).sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    console.error('LIST INDEPENDENT FILES ERROR:', error);
    res.status(500).json({ error: 'Failed to fetch independent files.' });
  }
};

export const viewFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ error: 'File not found' });

    // Log activity
    await logActivity({
      fileId: file._id,
      userId: req.user.id,
      action: 'viewed',
    });

    res.json(file);
  } catch (error) {
    console.error('View error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};



export const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.user._id;

    const file = await File.findById(fileId);

    if (!file) return res.status(404).json({ message: 'File not found' });

    if (file.uploadedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You can only delete files you uploaded' });
    }

    // Optional: delete from Cloudinary (only works if you saved the public_id)
    // await cloudinary.uploader.destroy(file.cloudinaryPublicId);

    await file.deleteOne();

        // Log activity
    await logActivity({
      fileId: file._id,
      userId: req.user.id,
      action: 'deleted',
    });
     // 
    //Notify group members
    await notifyGroupMembers({
      groupId: file.groupId,
      senderId: req.user.id,
      message: `${req.user.name || 'Someone'} deleted the file: "${file.title}"`,
    });

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting file' });
  }
};

// Soft delete file
export const softDeleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ message: 'File not found' });

    if (file.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    file.isTrashed = true;
    file.trashedAt = new Date();
    await file.save();

    res.status(200).json({ message: 'File moved to trash' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List trashed files for user
export const getTrashedFiles = async (req, res) => {
  try {
    const trashedFiles = await File.find({ uploadedBy: req.user._id, isTrashed: true });
    res.status(200).json(trashedFiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Restore file
export const restoreFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file || !file.isTrashed) return res.status(404).json({ message: 'File not found or not trashed' });

    if (file.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    file.isTrashed = false;
    file.trashedAt = null;
    await file.save();

    res.status(200).json({ message: 'File restored' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hard delete
export const permanentlyDeleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file || !file.isTrashed) return res.status(404).json({ message: 'File not found or not in trash' });

    if (file.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'File permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// upload user file by the user Id 
export const uploadUserFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file received.' });
    }

    const { title, tags } = req.body;
    const userId = req.user.id;

 
    const newFile = await File.create({
      title,
      fileType: req.file.mimetype,
      fileUrl: req.file.path,
      uploadedBy: userId,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    
    await logActivity({
      fileId: newFile._id,
      userId,
      action: 'uploaded',
    });

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// get user file by user id
export const getUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await File.find({ uploadedBy: userId });

    res.json({ files });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};