import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Modal from '../components/Modal';
import { postService } from '../services/api';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    cover_image: '',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAll();
      setPosts(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await postService.update(editingId, formData);
      } else {
        await postService.create(formData);
      }
      await loadPosts();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente deletar este post?')) {
      try {
        await postService.delete(id);
        await loadPosts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      content: post.content,
      cover_image: post.cover_image || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      cover_image: '',
    });
    setEditingId(null);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Blog</h2>
          <p className="text-gray-600 mt-2">Gerencie seus posts e artigos</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary"
        >
          + Novo Post
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Card>
        {loading ? (
          <p className="text-center text-gray-600 py-8">Carregando posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-600 py-8">Nenhum post encontrado</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  {post.cover_image && (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {post.slug}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="btn-small bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn-small bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={showModal}
        title={editingId ? 'Editar Post' : 'Novo Post'}
        onClose={handleClose}
        onConfirm={handleSubmit}
        confirmText={editingId ? 'Atualizar' : 'Criar'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              type="text"
              className="input-base"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo *</label>
            <textarea
              className="input-base"
              rows="6"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Escreva seu conteúdo aqui..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL da Capa</label>
            <input
              type="url"
              className="input-base"
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
