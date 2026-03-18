import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const storedUser = localStorage.getItem("furniture_app_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function eka
  const login = (userData) => {
    
    const userToSave = { ...userData, role: "designer" }; 
    setUser(userToSave);
    localStorage.setItem("furniture_app_user", JSON.stringify(userToSave));
  };

  // Logout function eka
  const logout = () => {
    setUser(null);
    localStorage.removeItem("furniture_app_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};