import File from '../models/File.js';
import { logActivity } from '../utils/activityLogger.js';
import { notifyGroupMembers } from '../utils/notifyGroup.js';

// export const uploadFile = async (req, res) => {
//   try {
//     const { title, tags } = req.body;
//     const groupId = req.params.groupId;
//     const userId = req.user.id;

//     const fileType = req.file.mimetype

//     const newFile = await File.create({
//       title,
//       fileType,
//       fileUrl: req.file.path,
//       groupId,
//       uploadedBy: userId,
//       tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
//     });

//         // Log activity
//     await logActivity({
//       fileId: File._id,
//       userId: req.user.id,
//       action: 'uploaded',
//     });

//     // Notify group members
//     await notifyGroupMembers({
//       groupId,
//       senderId: req.user.id,
//       message: `${req.user.name || 'Someone'} uploaded a file: "${title}"`,
//     });

//     res.status(201).json(newFile);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to upload file.' });
//     console.error(error);
//   }
// };

export const uploadFile = async (req, res) => {
  try {
    console.log('REQ.FILE:', req.file);  // Check if multer received the file
    if (!req.file) {
      return res.status(400).json({ error: 'No file received. Make sure the field name is "file".' });
    }

    const { title, tags } = req.body;
    const groupId = req.params.groupId;
    const userId = req.user.id;

    const fileType = req.file.mimetype;

    const newFile = await File.create({
      title,
      fileType,
      fileUrl: req.file.path, // or req.file.url if using cloudinary
      groupId,
      uploadedBy: userId,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    // Log activity
    await logActivity({
      fileId: newFile._id, // FIXED! was File._id which was incorrect
      userId: req.user.id,
      action: 'uploaded',
    });

    // Notify group members
    await notifyGroupMembers({
      groupId,
      senderId: req.user.id,
      message: `${req.user.name || 'Someone'} uploaded a file: "${title}"`,
    });

    res.status(201).json(newFile);
  } catch (error) {
    console.error('UPLOAD ERROR:', error);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
};


export const listGroupFiles = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const files = await File.find({ groupId }).sort({ createdAt: -1 });

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files.' });
    console.error(error);
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

