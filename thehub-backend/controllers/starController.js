import User from '../../models/User.js';


export const toggleStarGroup = async (req, res) => {
  const userId = req.user._id;
  const { groupId } = req.params;

  try {
    const user = await User.findById(userId);
    const isStarred = user.starredGroups.includes(groupId);

    if (isStarred) {
      user.starredGroups.pull(groupId);
    } else {
      user.starredGroups.push(groupId);
    }

    await user.save();
    res.status(200).json({ message: isStarred ? 'Group unstarred' : 'Group starred' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error toggling star group' });
  }
};

export const toggleStarFile = async (req, res) => {
  const userId = req.user._id;
  const { fileId } = req.params;

  try {
    const user = await User.findById(userId);
    const isStarred = user.starredFiles.includes(fileId);

    if (isStarred) {
      user.starredFiles.pull(fileId);
    } else {
      user.starredFiles.push(fileId);
    }

    await user.save();
    res.status(200).json({ message: isStarred ? 'File unstarred' : 'File starred' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error toggling star file' });
  }
};

export const getStarredItems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('starredGroups', 'name')
      .populate('starredFiles', 'name originalName');

    res.status(200).json({
      groups: user.starredGroups,
      files: user.starredFiles,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching starred items' });
  }
};