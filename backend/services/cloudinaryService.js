import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (filePath, folder = 'jardim-do-fazer') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto'
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      size: result.bytes
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      message: 'Imagem deletada com sucesso'
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const getOptimizedUrl = (publicId, options = {}) => {
  const {
    width = 500,
    height = 500,
    quality = 'auto',
    crop = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    crop,
    fetch_format: 'auto'
  });
};
