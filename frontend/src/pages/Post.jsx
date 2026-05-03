import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Buscar todos os posts e filtrar por slug
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        const foundPost = data.data.find(p => p.slug === slug);
        setPost(foundPost);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!post) {
    return <div className="h-screen flex items-center justify-center">Post não encontrado</div>;
  }

  return (
    <div className="w-full">
      
      {/* HERO COM IMAGEM */}
      <section className="relative h-96 bg-amber-100 flex items-center justify-center overflow-hidden">
        {post.cover_image ? (
          <img 
            src={post.cover_image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-9xl">📚</div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <button 
            onClick={() => navigate('/blog')}
            className="absolute top-4 left-4 text-white hover:text-amber-200 transition"
          >
            ← Voltar
          </button>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-amber-700">
            <span>📅 {new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="prose prose-sm md:prose max-w-none">
          <div className="text-amber-900 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
          <p className="text-amber-900 mb-4">
            Gostou? Conheça nossos produtos! 🎁
          </p>
          <button
            onClick={() => navigate('/loja')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition font-semibold"
          >
            Ir para Loja
          </button>
        </div>

        {/* Posts Relacionados */}
        <div className="mt-12 pt-8 border-t-2 border-amber-200">
          <h3 className="text-2xl font-bold text-amber-900 mb-6">
            Outros posts do blog
          </h3>
          <button
            onClick={() => navigate('/blog')}
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Ver todos os posts →
          </button>
        </div>
      </section>
    </div>
  );
}
