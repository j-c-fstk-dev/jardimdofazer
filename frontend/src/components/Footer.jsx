export default function Footer() {
  return (
    <footer className="bg-amber-50 border-t-2 border-amber-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          
          {/* Sobre */}
          <div>
            <h3 className="font-bold text-amber-900 mb-3">🌿 Jardim do Fazer</h3>
            <p className="text-sm text-amber-800">
              Brinquedos feitos à mão com carinho e amor para momentos únicos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-amber-900 mb-3">Menu</h3>
            <ul className="text-sm text-amber-800 space-y-2">
              <li><a href="/" className="hover:text-green-600">Home</a></li>
              <li><a href="/loja" className="hover:text-green-600">Loja</a></li>
              <li><a href="/blog" className="hover:text-green-600">Blog</a></li>
              <li><a href="/sobre" className="hover:text-green-600">Sobre</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-amber-900 mb-3">Contato</h3>
            <p className="text-sm text-amber-800">
              📧 contato@jardimfazer.com<br/>
              📱 (11) 99999-9999
            </p>
          </div>
        </div>

        <hr className="border-amber-200 mb-4" />
        
        <div className="text-center text-sm text-amber-700">
          <p>&copy; 2024 Jardim do Fazer. Todos os direitos reservados. 💚</p>
        </div>
      </div>
    </footer>
  );
}
