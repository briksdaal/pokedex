import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { fileTypeFromFile } from 'file-type';
import { buildCheckFunction } from 'express-validator';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads' });

export function processEmptyStringsBody(body) {
  return Object.fromEntries(
    Object.entries(body).map((e) => (e[1] === '' ? [e[0], null] : e))
  );
}

export const imageLocalUploadAndValidation = [
  upload.single('image'),
  buildCheckFunction(['file'])().custom(async (val) => {
    if (val) {
      const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      const meta = await fileTypeFromFile(val.path);

      if (!meta || !whitelist.includes(meta.mime)) {
        throw new Error('Unaccepted file type');
      }
    }
  })
];

export const uploadImageToCloudinary = (file) => {
  cloudinary.config({
    secure: true
  });

  const options = {
    public_id: file.originalname.split('.')[0],
    unique_filename: false,
    overwrite: true,
    folder: 'pokedex'
  };

  return cloudinary.uploader.upload(file.path, options);
};

export const deleteImageFromCloudinary = (imagePublicId) => {
  if (!imagePublicId) {
    return;
  }
  return cloudinary.uploader.destroy(imagePublicId);
};
