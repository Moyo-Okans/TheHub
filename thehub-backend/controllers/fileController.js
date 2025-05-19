import File from '../models/File.js';

export const uploadFile = async (req, res) => {
  try {
    const { title, tags } = req.body;
    const groupId = req.params.groupId;
    const userId = req.user.id;

    const fileType = req.file.mimetype.includes('pdf') ? 'pdf' : 'image';

    const newFile = await File.create({
      title,
      fileType,
      fileUrl: req.file.path,
      groupId,
      uploadedBy: userId,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    });

    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file.' });
    console.error(error);
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
