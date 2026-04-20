import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Modal from '../components/Modal';
import { productService } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: 'fisico_pronta',
    stock: '',
    production_time: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
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
        await productService.update(editingId, {
          ...formData,
          price: parseFloat(formData.price),
          stock: formData.stock ? parseInt(formData.stock) : null,
          production_time: formData.production_time ? parseInt(formData.production_time) : null,
        });
      } else {
        await productService.create({
          ...formData,
          price: parseFloat(formData.price),
          stock: formData.stock ? parseInt(formData.stock) : null,
          production_time: formData.production_time ? parseInt(formData.production_time) : null,
        });
      }
      await loadProducts();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente deletar este produto?')) {
      try {
        await productService.delete(id);
        await loadProducts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      type: product.type,
      stock: product.stock || '',
      production_time: product.production_time || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      type: 'fisico_pronta',
      stock: '',
      production_time: '',
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
          <h2 className="text-3xl font-bold text-gray-900">Produtos</h2>
          <p className="text-gray-600 mt-2">Gerencie todos os seus produtos</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary"
        >
          + Novo Produto
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Card>
        {loading ? (
          <p className="text-center text-gray-600 py-8">Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600 py-8">Nenhum produto encontrado</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Preço</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estoque</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr key={product.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <span className="badge-info">{product.type}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">R$ {product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.stock || '-'}</td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn-small bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn-small bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        isOpen={showModal}
        title={editingId ? 'Editar Produto' : 'Novo Produto'}
        onClose={handleClose}
        onConfirm={handleSubmit}
        confirmText={editingId ? 'Atualizar' : 'Criar'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input
              type="text"
              className="input-base"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              className="input-base"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preço *</label>
              <input
                type="number"
                step="0.01"
                className="input-base"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
              <select
                className="input-base"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="fisico_pronta">Pronta Entrega</option>
                <option value="fisico_encomenda">Sob Encomenda</option>
                <option value="digital">Digital</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
              <input
                type="number"
                className="input-base"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Produção (dias)</label>
              <input
                type="number"
                className="input-base"
                value={formData.production_time}
                onChange={(e) => setFormData({ ...formData, production_time: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
