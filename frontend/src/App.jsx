import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Loja from './pages/Loja';
import Produto from './pages/Produto';
import Blog from './pages/Blog';
import Post from './pages/Post';
import Sobre from './pages/Sobre';
import './styles/globals.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-scrapbook">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
