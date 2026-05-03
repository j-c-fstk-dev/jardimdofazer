import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Produto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();
        setProduto(data.data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Implementar carrinho
    alert(`${quantidade}x ${produto.name} adicionado ao carrinho!`);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!produto) {
    return <div className="h-screen flex items-center justify-center">Produto não encontrado</div>;
  }

  return (
    <div className="w-full">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate('/loja')}
            className="text-green-600 hover:text-green-700 mb-6"
          >
            ← Voltar para Loja
          </button>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Imagem */}
          <div>
            <div className="bg-amber-100 rounded-lg h-96 flex items-center justify-center overflow-hidden mb-4">
              {produto.images && produto.images[0] ? (
                <img 
                  src={produto.images[0]} 
                  alt={produto.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-9xl">🧸</div>
              )}
            </div>
            
            {/* Imagens adicionais */}
            {produto.images && produto.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {produto.images.slice(1).map((img, idx) => (
                  <div key={idx} className="bg-amber-100 rounded h-20 flex items-center justify-center">
                    <img src={img} alt={`${produto.name} ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              {produto.name}
            </h1>

            {/* Tipo */}
            <div className="mb-4">
              <span className="inline-block text-sm bg-amber-100 text-amber-900 px-4 py-2 rounded-full font-semibold">
                {produto.type === 'fisico_pronta' && '✓ Pronta Entrega'}
                {produto.type === 'fisico_encomenda' && '📅 Sob Encomenda'}
                {produto.type === 'digital' && '💾 Produto Digital'}
              </span>
            </div>

            {/* Descrição */}
            <p className="text-amber-800 mb-6 text-lg">
              {produto.description || 'Produto feito com carinho'}
            </p>

            {/* Prazo */}
            {produto.production_time && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900">
                  ⏱️ Tempo de produção: <strong>{produto.production_time} dias</strong>
                </p>
              </div>
            )}

            {/* Preço */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Preço</p>
              <p className="text-4xl font-bold text-green-600">
                R$ {produto.price.toFixed(2).replace('.', ',')}
              </p>
            </div>

            {/* Stock */}
            {produto.stock && (
              <p className="text-amber-800 mb-6">
                Em estoque: <strong>{produto.stock} unidades</strong>
              </p>
            )}

            {/* Quantidade */}
            <div className="mb-6">
              <label className="block text-amber-900 font-semibold mb-2">
                Quantidade
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                  className="bg-amber-100 hover:bg-amber-200 w-10 h-10 rounded transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border border-amber-300 rounded py-2"
                />
                <button
                  onClick={() => setQuantidade(quantidade + 1)}
                  className="bg-amber-100 hover:bg-amber-200 w-10 h-10 rounded transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botão Comprar */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition text-lg mb-4"
            >
              🛒 Adicionar ao Carrinho
            </button>

            {/* Info adicional */}
            <div className="bg-amber-50 rounded-lg p-4 text-sm text-amber-900">
              <p className="mb-2">✨ Cada produto é feito à mão com carinho</p>
              <p className="mb-2">📦 Entrega cuidadosa e bem embalada</p>
              <p>💚 Feito com amor para sua família</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
