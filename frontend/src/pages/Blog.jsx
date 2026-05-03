import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full">
      
      {/* HERO */}
      <section className="bg-gradient-to-b from-amber-100 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            📝 Blog
          </h1>
          <p className="text-amber-800">
            Histórias, dicas e inspirações para brincar em família
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-amber-800">Carregando posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-800">Nenhum post publicado ainda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link
                key={post.id}
                to={`/post/${post.slug}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group"
              >
                {/* Imagem */}
                <div className="bg-amber-100 h-48 flex items-center justify-center overflow-hidden group-hover:scale-105 transition">
                  {post.cover_image ? (
                    <img 
                      src={post.cover_image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-5xl">��</div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-green-600 transition">
                    {post.title}
                  </h3>
                  
                  <p className="text-amber-800 text-sm mb-4 line-clamp-2">
                    {post.content.substring(0, 100)}...
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-amber-700">
                      {new Date(post.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="text-green-600 font-semibold">
                      Ler mais →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
