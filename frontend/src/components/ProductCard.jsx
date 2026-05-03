import { Link } from 'react-router-dom';

export default function ProductCard({ produto }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      
      {/* Imagem */}
      <div className="bg-amber-100 h-64 flex items-center justify-center overflow-hidden">
        {produto.images && produto.images[0] ? (
          <img 
            src={produto.images[0]} 
            alt={produto.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-6xl">🧸</div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-amber-900 mb-2">
          {produto.name}
        </h3>
        
        <p className="text-amber-800 text-sm mb-4 line-clamp-2">
          {produto.description || 'Produto feito com carinho'}
        </p>

        {/* Tipo */}
        <div className="mb-3">
          <span className="inline-block text-xs bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            {produto.type === 'fisico_pronta' && '✓ Pronta Entrega'}
            {produto.type === 'fisico_encomenda' && '📅 Encomenda'}
            {produto.type === 'digital' && '💾 Digital'}
          </span>
        </div>

        {/* Prazo */}
        {produto.production_time && (
          <p className="text-xs text-amber-700 mb-3">
            ⏱️ {produto.production_time} dias de produção
          </p>
        )}

        {/* Preço */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-green-600">
            R$ {produto.price.toFixed(2).replace('.', ',')}
          </p>
        </div>

        {/* Botão */}
        <Link
          to={`/produto/${produto.id}`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded transition font-semibold"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
