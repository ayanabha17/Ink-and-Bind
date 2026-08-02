import { createContext, useState, ReactNode, useContext } from 'react';

// 1. Create the Context
export const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    
      {children}
    
  );
};

// 3. Create the custom hook so other files can use the context
export const useAuth = () => {
  return useContext(AuthContext);
};