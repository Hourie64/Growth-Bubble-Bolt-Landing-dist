import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            GROWTH
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Accueil
            </Link>
            <Link 
              to="/entreprise" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Espace Pro
            </Link>
            <Link 
              to="/perso" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Espace Perso
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}