export default function Sobre() {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-b from-amber-100 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">💚 Sobre Nós</h1>
          <p className="text-amber-800 text-lg">Conheça a história por trás de cada brinquedo</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-6">🌿 Nossa Origem</h2>
          <p className="text-amber-800 text-lg">Jardim do Fazer nasceu da paixão por criar brinquedos especiais.</p>
        </div>

        <div className="text-center bg-amber-100 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Contato</h2>
          <p className="text-amber-800 mb-6">Tem alguma dúvida?</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:contato@jardimfazer.com" className="bg-green-600 text-white px-6 py-2 rounded">Email</a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-2 rounded">WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
