// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'text-yellow-400' : 'text-white';

  return (
    <nav className="bg-gray-800 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to='/'>
          <div className="text-2xl font-bold">AlgoViz</div>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/sorting" className={isActive('/sorting')}>Sorting</Link>
          <Link to="/graph" className={isActive('/graph')}>Graph</Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-lg text-center font-medium">
          <Link to="/" className={isActive('/')} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/sorting" className={isActive('/sorting')} onClick={() => setIsOpen(false)}>Sorting</Link>
          <Link to="/graph" className={isActive('/graph')} onClick={() => setIsOpen(false)}>Graph</Link>
        </div>
      )}
    </nav>
  );
}
