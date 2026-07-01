// src/contexts/AppContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bueiros, setBueiros] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [trab, setTrab] = useState([]); // ainda mock por enquanto
  const [loading, setLoading] = useState(false);

  // adapta os campos do back para o formato usado no front
  const adaptarBueiro = (b) => ({
    ...b,
    end: b.endereco,
    lat: b.latitude,
    lng: b.longitude,
    prof: b.profundidade_cm,
    status: b.status ? b.status.toLowerCase() : b.status,
  });

  // Carregar dados do backend
  const loadData = async () => {
    setLoading(true);
    try {
      const [bueirosRes, alertasRes] = await Promise.all([
        api.get('/bueiros'),
        api.get('/alertas')
      ]);

      setBueiros(bueirosRes.data.map(adaptarBueiro));
      setAlertas(alertasRes.data);

      console.log("✅ Dados carregados do backend");

    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      // Fallback para mock se a API falhar 
      if (bueiros.length === 0) {
        console.warn("Usando dados mock como fallback");
      }
    } finally {
      setLoading(false);
    }
  };

  // funtion p atualizar bueiros (usada em várias páginas)
  const refreshBueiros = async () => {
    try {
      const res = await api.get('/bueiros');
      setBueiros(res.data.map(adaptarBueiro));
    } catch (e) {
      console.error(e);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setBueiros([]);
    setAlertas([]);
  };

  // Carregar dados quando o usuário logar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user) {
      loadData();
      const interval = setInterval(refreshBueiros, 8000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      bueiros,
      setBueiros,
      alertas,
      setAlertas,
      trab,
      setTrab,
      loading,
      loadData,
      refreshBueiros,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
}