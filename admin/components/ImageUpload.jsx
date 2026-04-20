import { useState } from 'react';
import api from '../services/api';

export const ImageUpload = ({ onImageUpload, type = 'product', previewImage = null }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(previewImage);

  const handleFile = async (file) => {
    setError('');

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter menos de 5MB');
      return;
    }

    try {
      setUploading(true);
      
      let response;
      if (type === 'product') {
        response = await api.uploadProductImage(file);
      } else if (type === 'post') {
        response = await api.uploadPostImage(file);
      }

      if (response.success) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);

        onImageUpload(response.data.url, response.data.publicId);
      } else {
        setError(response.message || 'Erro ao fazer upload');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition"
      >
        {preview ? (
          <div>
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-40 mx-auto mb-4 rounded"
            />
            <label className="text-sm text-gray-600 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={uploading}
                className="hidden"
              />
              <span className="text-green-600 hover:text-green-700">
                {uploading ? 'Enviando...' : 'Alterar imagem'}
              </span>
            </label>
          </div>
        ) : (
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              disabled={uploading}
              className="hidden"
            />
            <div>
              <div className="text-2xl mb-2">📸</div>
              <p className="text-gray-700 font-medium mb-1">
                Arraste uma imagem ou clique para selecionar
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG ou WebP (máx. 5MB)
              </p>
            </div>
          </label>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      {uploading && (
        <div className="flex items-center justify-center mt-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
          <span className="text-sm text-gray-600 ml-2">Enviando...</span>
        </div>
      )}
    </div>
  );
};
