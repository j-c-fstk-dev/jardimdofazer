import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Modal from '../components/Modal';
import { orderService } from '../services/api';

const statusBadges = {
  pending: 'badge-warning',
  paid: 'badge-success',
  shipped: 'badge-info',
  delivered: 'badge-success',
};

const statusLabels = {
  pending: 'Pendente',
  paid: 'Paguo',
  shipped: 'Enviado',
  delivered: 'Entregue',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    try {
      await orderService.updateStatus(selectedOrder.id, newStatus);
      await loadOrders();
      setShowStatusModal(false);
      setSelectedOrder(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowStatusModal(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Pedidos</h2>
        <p className="text-gray-600 mt-2">Acompanhe todos os seus pedidos</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Card>
        {loading ? (
          <p className="text-center text-gray-600 py-8">Carregando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 py-8">Nenhum pedido encontrado</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      Pedido #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {order.customer_name} • {order.email}
                    </p>
                  </div>
                  <span className={statusBadges[order.status]}>
                    {statusLabels[order.status]}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 pb-3 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Total</p>
                    <p className="text-lg font-bold text-gray-900">R$ {order.total_price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Itens</p>
                    <p className="text-lg font-bold text-gray-900">{order.items?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Data</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Telefone</p>
                    <p className="text-sm font-medium text-gray-900">{order.phone || '-'}</p>
                  </div>
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="mb-3 bg-gray-50 rounded p-3">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Produtos:</p>
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item.id} className="text-sm text-gray-700">
                          {item.product_name} × {item.quantity} (R$ {item.price.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => handleOpenStatusModal(order)}
                  className="btn-small bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  Alterar Status
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        isOpen={showStatusModal}
        title="Alterar Status do Pedido"
        onClose={() => setShowStatusModal(false)}
        onConfirm={handleStatusChange}
        confirmText="Atualizar"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Pedido #{selectedOrder?.id} - {selectedOrder?.customer_name}
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Novo Status</label>
            <select
              className="input-base"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
