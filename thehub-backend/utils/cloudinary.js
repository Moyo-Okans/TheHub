import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const connectCloudinary = () => {
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'thehub_uploads',
    // allowed_formats: [
    //   'jpg', 'png', 'jpeg', 'pdf',
    //   'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'
    // ],
    resource_type: 'raw',
  },
});

export { connectCloudinary, storage };
