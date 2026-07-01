import { useState, useEffect, useContext } from 'react';
import { AppProvider, AppContext } from './contexts/AppContext';
import PublicHome from './pages/public/PublicHome';
import Login from './pages/auth/Login';
import AppShell from './layouts/AppShell';

function AppContent() {
  const [currentView, setCurrentView] = useState('public');
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: "Administrador", av: "AD", role: "admin" });
      setCurrentView('app');
    }
  }, []);

  const handleLogin = (userData) => {
    console.log("✅ Login realizado com sucesso!", userData);
    setUser(userData);
    setCurrentView('app');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentView('public');
  };

  return (
    <>
      {currentView === 'public' && (
        <PublicHome onGoLogin={() => setCurrentView('login')} bueiros={[]} />
      )}

      {currentView === 'login' && (
        <Login onLogin={handleLogin} onBack={() => setCurrentView('public')} />
      )}

      {currentView === 'app' && (
        <AppShell
          user={user || { name: "Administrador", av: "AD", role: "admin" }}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}