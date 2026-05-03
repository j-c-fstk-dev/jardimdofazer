import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProdutos(data.data || []);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const produtosFiltrados = filtro === 'todos' 
    ? produtos 
    : produtos.filter(p => p.type === filtro);

  return (
    <div className="w-full">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-amber-100 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            🛍️ Nossa Loja
          </h1>
          <p className="text-amber-800">
            Produtos feitos com carinho, pensados para suas crianças
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        
        {/* FILTROS */}
        <div className="mb-8 flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded transition ${
              filtro === 'todos'
                ? 'bg-green-600 text-white'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('fisico_pronta')}
            className={`px-4 py-2 rounded transition ${
              filtro === 'fisico_pronta'
                ? 'bg-green-600 text-white'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            Pronta Entrega
          </button>
          <button
            onClick={() => setFiltro('fisico_encomenda')}
            className={`px-4 py-2 rounded transition ${
              filtro === 'fisico_encomenda'
                ? 'bg-green-600 text-white'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            Encomenda
          </button>
          <button
            onClick={() => setFiltro('digital')}
            className={`px-4 py-2 rounded transition ${
              filtro === 'digital'
                ? 'bg-green-600 text-white'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            Digitais
          </button>
        </div>

        {/* PRODUTOS */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-amber-800">Carregando produtos...</p>
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-800">Nenhum produto encontrado nesta categoria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map(produto => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
