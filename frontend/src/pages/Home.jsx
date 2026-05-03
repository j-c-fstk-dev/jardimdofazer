import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      
      {/* HERO SECTION */}
      <section className="relative h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 flex items-center justify-center overflow-hidden">
        
        {/* Background decorativo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl">🦋</div>
          <div className="absolute top-20 right-20 text-5xl">🌿</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">🦋</div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-handwriting text-amber-900 mb-4">
            Jardim do Fazer
          </h1>
          <p className="text-xl text-amber-800 mb-2">
            🌸 Brincando em família
          </p>
          <p className="text-lg text-amber-700 mb-8">
            Agora é Pentecostes: um tempo para escutar, reunir e doar o que há de mais belo em nós.
          </p>
          
          <Link 
            to="/loja" 
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition mb-4"
          >
            Vem Ler 📚
          </Link>
        </div>
      </section>

      {/* SEÇÃO DE DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Imagem */}
          <div className="relative">
            <div className="bg-amber-100 rounded-full h-80 w-80 mx-auto flex items-center justify-center">
              <div className="text-6xl">🧸</div>
            </div>
          </div>

          {/* Texto */}
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Nossa História
            </h2>
            <p className="text-amber-800 mb-4">
              Cada brinquedo é feito com carinho e dedicação. Acreditamos que o brincar é fundamental para o desenvolvimento das crianças.
            </p>
            <p className="text-amber-800 mb-6">
              Todos os nossos produtos são criados manualmente, respeitando o tempo, a qualidade e a sustentabilidade.
            </p>
            <Link 
              to="/sobre"
              className="inline-block text-green-600 hover:text-green-700 font-semibold"
            >
              Saiba mais sobre nós →
            </Link>
          </div>
        </div>
      </section>

      {/* BRINQUEDO DO MÊS */}
      <section className="bg-gradient-to-r from-amber-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">
            ✨ Brinquedo do Mês
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">🧸</div>
              <h3 className="text-2xl font-bold text-amber-900">Urso de Crochê</h3>
            </div>
            <p className="text-amber-800 mb-6 text-center">
              Feito com muito carinho, este mês apresentamos nosso querido urso de crochê. Perfeito para presentear ou guardar de lembrança.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/loja"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
              >
                Comprar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ÚLTIMOS POSTS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-amber-900 mb-12">
          📝 Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-amber-50 rounded-lg p-6">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-amber-900 mb-2">Post 1</h3>
            <p className="text-amber-800 text-sm mb-4">Descrição do post...</p>
            <Link to="/blog" className="text-green-600 hover:text-green-700 font-semibold">
              Ler mais →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
