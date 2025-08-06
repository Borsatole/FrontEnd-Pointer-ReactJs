import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/comum/alertas";
import { requisicaoPost } from "../services/requisicoes";


interface AuthData {
  token: string | null;
  loggedIn: boolean;
}

interface AuthContextType {
  auth: AuthData;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthData>({
    token: localStorage.getItem("token"),
    loggedIn: !!localStorage.getItem("token"),
  });


  const verificaToken = useCallback(async (token: string) => {
    try {
      const response = await requisicaoPost(`/Auth/Token/valida-jwt.php`, { token });
  
      if (!response || !response.data.success) {
        Alerta("swal", "error", `${response?.data?.error || "Erro desconhecido"}`);
        logout();
      }
    } catch (error) {
      Alerta("swal", "error", `${error}`);
      logout();
    }
  }, []);
  

  // Efeito que roda quando o token muda
  useEffect(() => {
    if (auth.token) {
      verificaToken(auth.token);
    }
  }, [auth.token, verificaToken]);

  // Função de login
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setAuth({ token, loggedIn: true });
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, loggedIn: false });

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
