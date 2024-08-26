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

function createCloudinaryErrorArray(
  error,
  defaultMsg = 'Error uploading image to cloud'
) {
  let msg = defaultMsg;
  if (error?.message?.includes('File size too large.')) {
    msg = error.message?.split(' Upgrade your plan')[0];
  }

  return [
    {
      type: 'field',
      path: 'image',
      location: 'body',
      msg
    }
  ];
}

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

export const handleFileUpload = async (object, req, res) => {
  try {
    const uploadRes = await uploadImageToCloudinary(req.file);
    object.image = uploadRes?.secure_url;
    object.image_public_id = uploadRes?.public_id;
    return object;
  } catch (e) {
    res.locals.errors = createCloudinaryErrorArray(e);
    return null;
  }
};

export const handleFileUpdate = async (object, req, res) => {
  try {
    if (req.body?.['remove-image'] === 'on') {
      await deleteImageFromCloudinary(res.locals.imagePublicId);
      object.image = '';
    } else if (req.file) {
      object = await handleFileUpload(object, req, res);
      await deleteImageFromCloudinary(res.locals.imagePublicId);
    } else {
      object.image = null;
      object.image_public_id = null;
    }
    return object;
  } catch (e) {
    res.locals.errors = createCloudinaryErrorArray(e);
    return null;
  }
};

export const handleFileDelete = async (imagePublicId, res) => {
  try {
    await deleteImageFromCloudinary(imagePublicId);
    return true;
  } catch (e) {
    res.locals.errors = createCloudinaryErrorArray(
      e,
      'Error deleting image from cloud'
    );
    return null;
  }
};
