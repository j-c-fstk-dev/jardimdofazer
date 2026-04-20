import { useState, useEffect } from 'react';
import { Card, StatCard } from '../components/Card';
import { productService, orderService, postService } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalPosts: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [products, orders, posts] = await Promise.all([
          productService.getAll(),
          orderService.getAll(),
          postService.getAll(),
        ]);

        const totalRevenue = orders.reduce((sum, order) => sum + (order.total_price || 0), 0);

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalPosts: posts.length,
          totalRevenue: totalRevenue.toFixed(2),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Bem-vindo! Aqui está um resumo dos seus dados.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Erro ao carregar dados: {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="📦" label="Produtos" value={stats.totalProducts} color="primary" />
        <StatCard icon="🛒" label="Pedidos" value={stats.totalOrders} color="success" />
        <StatCard icon="📝" label="Posts" value={stats.totalPosts} color="warning" />
        <StatCard icon="💰" label="Receita Total" value={`R$ ${stats.totalRevenue}`} color="danger" />
      </div>

      {/* Recently Added */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card
          title="Últimos Pedidos"
          subtitle="Pedidos recentes no seu ecommerce"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Carregando...</p>
                <p className="text-sm text-gray-500">Pedidos mais recentes</p>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="Produtos em Destaque"
          subtitle="Seus produtos principais"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Carregando...</p>
                <p className="text-sm text-gray-500">Produtos mais recentes</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
