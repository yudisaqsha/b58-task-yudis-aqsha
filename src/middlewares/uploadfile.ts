import multer from 'multer';
import { StorageEngine } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const storage: StorageEngine = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  } as any,
});

const upload = multer({ storage });
export const uploadMultiple = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'coverPic', maxCount: 1 },
]);
export default upload;
