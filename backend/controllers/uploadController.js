import { uploadImage } from '../services/cloudinaryService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadProductImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem fornecida'
      });
    }

    const image = req.files.image;
    const uploadDir = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const tempPath = path.join(uploadDir, `temp-${Date.now()}-${image.name}`);
    await image.mv(tempPath);

    const cloudinaryResult = await uploadImage(tempPath, 'jardim-do-fazer/produtos');

    fs.unlinkSync(tempPath);

    if (!cloudinaryResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao fazer upload para Cloudinary',
        error: cloudinaryResult.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Imagem enviada com sucesso',
      data: {
        url: cloudinaryResult.url,
        publicId: cloudinaryResult.publicId,
        width: cloudinaryResult.width,
        height: cloudinaryResult.height
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar upload',
      error: error.message
    });
  }
};

export const uploadPostImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem fornecida'
      });
    }

    const image = req.files.image;
    const uploadDir = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const tempPath = path.join(uploadDir, `temp-${Date.now()}-${image.name}`);
    await image.mv(tempPath);

    const cloudinaryResult = await uploadImage(tempPath, 'jardim-do-fazer/posts');

    fs.unlinkSync(tempPath);

    if (!cloudinaryResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao fazer upload',
        error: cloudinaryResult.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Imagem enviada com sucesso',
      data: {
        url: cloudinaryResult.url,
        publicId: cloudinaryResult.publicId
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar upload',
      error: error.message
    });
  }
};
