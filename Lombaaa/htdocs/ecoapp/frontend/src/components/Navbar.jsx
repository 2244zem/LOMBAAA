// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsMobileMenuOpen(false);
    navigate('/auth');
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Navbar */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90">
            <span className="text-3xl">🌱</span>
            <span className="hidden sm:block">EcoApp</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-green-200 font-medium transition-colors ${
                location.pathname === '/' ? 'text-green-200 font-semibold' : ''
              }`}
            >
              Peta Sampah
            </Link>
            <Link 
              to="/ai-assistant" 
              className={`hover:text-green-200 font-medium transition-colors ${
                location.pathname === '/ai-assistant' ? 'text-green-200 font-semibold' : ''
              }`}
            >
              AI Assistant
            </Link>
            <Link 
              to="/pusat-daur-ulang" 
              className={`hover:text-green-200 font-medium transition-colors ${
                location.pathname === '/pusat-daur-ulang' ? 'text-green-200 font-semibold' : ''
              }`}
            >
              Daur Ulang
            </Link>
            <Link 
              to="/marketplace" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                location.pathname === '/marketplace' 
                  ? 'bg-white text-green-600 shadow-lg' 
                  : 'bg-green-500 hover:bg-green-400 text-white'
              }`}
            >
              <span>🛍️</span>
              <span>Marketplace</span>
            </Link>
            <Link 
              to="/tukar-sampah" 
              className={`hover:text-green-200 font-medium transition-colors ${
                location.pathname === '/tukar-sampah' ? 'text-green-200 font-semibold' : ''
              }`}
            >
              Tukar Sampah
            </Link>
            <Link 
              to="/bisnis-lingkungan" 
              className={`hover:text-green-200 font-medium transition-colors ${
                location.pathname === '/bisnis-lingkungan' ? 'text-green-200 font-semibold' : ''
              }`}
            >
              Bisnis
            </Link>
          </div>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Info with Balance */}
                <div className="flex items-center space-x-3 bg-green-700 px-4 py-2 rounded-lg">
                  <div className="text-right">
                    <span className="text-green-100 block text-sm">Halo, {user.name}</span>
                    <span className="text-yellow-300 block text-xs font-semibold">
                      Saldo: Rp {user.balance?.toLocaleString('id-ID') || '0'}
                    </span>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
                
                <Link 
                  to="/profil" 
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Profil
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="bg-white text-green-600 hover:bg-green-50 font-semibold px-6 py-2 rounded-lg transition-colors shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2 bg-green-700 px-3 py-1 rounded-lg">
                <span className="text-green-100 text-sm">Halo, {user.name}</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-semibold">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
            )}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-green-500 transition-colors"
            >
              {isMobileMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-green-700 rounded-lg shadow-xl mb-4 animate-fadeIn">
            <div className="py-4 space-y-3">
              {/* User Info Section */}
              {user && (
                <div className="px-4 py-3 bg-green-600 rounded-lg mx-4 mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-lg font-semibold">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-yellow-300 text-sm font-semibold">
                        Saldo: Rp {user.balance?.toLocaleString('id-ID') || '0'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <Link 
                to="/" 
                className={`block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors ${
                  location.pathname === '/' ? 'bg-green-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <span>🗺️</span>
                  <span>Peta Sampah</span>
                </div>
              </Link>
              
              <Link 
                to="/ai-assistant" 
                className={`block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors ${
                  location.pathname === '/ai-assistant' ? 'bg-green-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <span>🤖</span>
                  <span>AI Assistant</span>
                </div>
              </Link>
              
              <Link 
                to="/pusat-daur-ulang" 
                className={`block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors ${
                  location.pathname === '/pusat-daur-ulang' ? 'bg-green-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <span>♻️</span>
                  <span>Pusat Daur Ulang</span>
                </div>
              </Link>
              
              <Link 
                to="/marketplace" 
                className={`block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors font-semibold ${
                  location.pathname === '/marketplace' ? 'bg-yellow-500 text-green-900' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <span>🛍️</span>
                  <span>Marketplace</span>
                </div>
              </Link>
              
              <Link 
                to="/tukar-sampah" 
                className={`block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors ${
                  location.pathname === '/tukar-sampah' ? 'bg-green-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <span>🔄</span>
                  <span>Tukar Sampah</span>
                </div>
              </Link>
              
              <Link 
                to="/bisnis-lingkungan" 
                className={`block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors ${
                  location.pathname === '/bisnis-lingkungan' ? 'bg-green-500' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <span>💼</span>
                  <span>Bisnis Lingkungan</span>
                </div>
              </Link>

              {/* User Actions */}
              <div className="border-t border-green-600 pt-3 mt-3">
                {user ? (
                  <>
                    <Link 
                      to="/profil" 
                      className="block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span>👤</span>
                        <span>Profil Saya</span>
                      </div>
                    </Link>
                    <Link 
                      to="/lapor" 
                      className="block px-4 py-3 hover:bg-green-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <span>📝</span>
                        <span>Lapor Sampah</span>
                      </div>
                    </Link>
                    <button 
                      className="w-full text-left px-4 py-3 hover:bg-red-500 rounded-lg transition-colors"
                      onClick={handleLogout}
                    >
                      <div className="flex items-center space-x-3">
                        <span>🚪</span>
                        <span>Logout</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="w-full text-left px-4 py-3 bg-white text-green-600 rounded-lg font-semibold"
                  >
                    <div className="flex items-center space-x-3 justify-center">
                      <span>🔐</span>
                      <span>Login / Daftar</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;