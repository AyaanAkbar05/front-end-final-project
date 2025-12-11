import React, { createContext, useEffect, useState } from "react";
import type { UserPayload } from "../types";


interface AuthState {
  user: UserPayload | null;
  token: string | null;
  login: (token: string, user: UserPayload) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("tm_token"));
  const [user, setUser] = useState<UserPayload | null>(() => {
    const raw = localStorage.getItem("tm_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("tm_token", token);
    else localStorage.removeItem("tm_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("tm_user", JSON.stringify(user));
    else localStorage.removeItem("tm_user");
  }, [user]);

  const login = (tok: string, u: UserPayload) => {
    setToken(tok);
    setUser(u);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
