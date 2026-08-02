import { createContext, useState, ReactNode } from 'react';

// 1. Create the Context
export const AuthContext = createContext<any>(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};