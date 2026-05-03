import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          🌿 Jardim do Fazer
        </Link>

        {/* Menu */}
        <ul className="flex gap-6 items-center">
          <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
          <li><Link to="/loja" className="hover:text-green-600 transition">Loja</Link></li>
          <li><Link to="/blog" className="hover:text-green-600 transition">Blog</Link></li>
          <li><Link to="/sobre" className="hover:text-green-600 transition">Sobre</Link></li>
          <li>
            <Link to="/carrinho" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              🛒 Carrinho
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
