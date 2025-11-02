import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from '../features/cart/cartSlice';

function Header() {
  const items = useSelector(selectItems);
  const location = useLocation();
  const name="dvoraHalevi";
  const tamarrotan= "hello tamar!"
const tamar2="good luck!!!!!"

  return (
    <header className="py-4 bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">Naama & Tovi</h1>
        <h1 className="text-2xl font-bold">Shopping App</h1>
        <h1>{tamarrotan}</h1>
        <nav className="flex space-x-6">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'font-bold' : ''}`}>
            Shopping List
          </Link>
          <Link to="/order" className={`nav-link ${location.pathname === '/order' ? 'font-bold' : ''}`}>
            Order Details {items.length > 0 && `(${items.length})`}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;