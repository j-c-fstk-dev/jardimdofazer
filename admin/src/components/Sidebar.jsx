import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Produtos', icon: '📦' },
    { path: '/orders', label: 'Pedidos', icon: '🛒' },
    { path: '/posts', label: 'Blog', icon: '📝' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Menu</h2>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Versão 1.0.0</p>
          <p className="text-xs text-gray-500">Backend Status: ✅ Online</p>
        </div>
      </div>
    </aside>
  );
}
