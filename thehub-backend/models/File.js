import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    //enum: ['pdf', 'image'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  isTrashed: {
    type: Boolean,
    default: false
  },
  trashedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default mongoose.model("File", fileSchema);
