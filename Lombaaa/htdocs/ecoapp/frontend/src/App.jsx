// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';

// Import features/pages dengan React.lazy
const PetaSampah = React.lazy(() => import('./features/petaSampah'));
const LaporanSampah = React.lazy(() => import('./features/laporanSampah'));
const ProfilPengguna = React.lazy(() => import('./features/profilPengguna'));
const Auth = React.lazy(() => import('./features/auth'));
const PusatDaurUlang = React.lazy(() => import('./features/pusatDaurUlang'));
const MarketplaceKarya = React.lazy(() => import('./features/marketplaceKarya'));
const TukarSampah = React.lazy(() => import('./features/tukarSampah'));
const BisnisLingkungan = React.lazy(() => import('./features/bisnisLingkungan'));
const AIAssistant = React.lazy(() => import('./features/aiAssistant/Index'));

import './App.css';

// Inner App component that uses the hooks
function AppContent() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${theme}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <React.Suspense fallback={<div className="text-center">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<PetaSampah />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/lapor" element={user ? <LaporanSampah /> : <Navigate to="/auth" replace />} />
            <Route path="/profil" element={user ? <ProfilPengguna /> : <Navigate to="/auth" replace />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" replace />} />
            <Route path="/pusat-daur-ulang" element={<PusatDaurUlang />} />
            <Route path="/marketplace" element={<MarketplaceKarya />} />
            <Route path="/tukar-sampah" element={<TukarSampah />} />
            <Route path="/bisnis-lingkungan" element={<BisnisLingkungan />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
}

// Main App component with providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;