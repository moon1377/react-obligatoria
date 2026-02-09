import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // estado que guarda los datos del usuario, null si no hay sesion
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('googleUser'); // busca usuario en localstorage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      const userData = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture
      };

      setUser(userData);
      localStorage.setItem('googleUser', JSON.stringify(userData)); 
    } catch (error) {
      console.error("Error al decodificar el login:", error);
    }
  };

  // cierra la sesion del usuario
  const logout = () => {
    setUser(null); // limpia estado
    localStorage.removeItem('googleUser');
    window.location.reload(); //recarga la pagina para limpiar estado
  };

  return (
    <AuthContext.Provider value={{ user, handleGoogleSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);