export function StatCard({ icon, label, value, color = 'primary' }) {
  const bgColor = {
    primary: 'bg-purple-50',
    success: 'bg-green-50',
    warning: 'bg-yellow-50',
    danger: 'bg-red-50',
  }[color];

  const textColor = {
    primary: 'text-purple-700',
    success: 'text-green-700',
    warning: 'text-yellow-700',
    danger: 'text-red-700',
  }[color];

  return (
    <div className={`${bgColor} rounded-lg p-6 border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className={`text-3xl font-bold mt-2 ${textColor}`}>{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

export function Card({ children, title, subtitle, action }) {
  return (
    <div className="card animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          {title && <h3 className="text-lg font-bold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
