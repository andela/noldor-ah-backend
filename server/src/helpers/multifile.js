/**
 * Resources: https://medium.freecodecamp.org/how-to-allow-users-to-upload-images-with-node-express-mongoose-and-cloudinary-84cefbdff1d9
 * https://www.npmjs.com/package/multer-storage-cloudinary
 * https://cloudinary.com/documentation/solution_overview
 */
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'Author\'s Haven',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  transformation: [{ width: 300, height: 300, crop: 'thumb' }]
});

const upload = multer({ storage });

const multifile = upload.single('avatar');

export default multifile;
