import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "@components/comum/alertas";
import { requisicaoGet, requisicaoPost } from "@services/requisicoes";
import { useMenu } from "../context/MenuContext";

interface UserData {
  avatar: string;
  nome: string;
  email: string;
  tipoDeUsuario: string;
}

interface AuthData {
  token: string | null;
  loggedIn: boolean;
  user: UserData | null;
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
  const { fecharMenu } = useMenu();
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthData>({
    token: localStorage.getItem("token"),
    loggedIn: !!localStorage.getItem("token"),
    user: null,
  });

  const carregarDadosUsuario = useCallback(async () => {
    try {
      const RotaApi = import.meta.env.VITE_API;
      const response = await requisicaoGet("/usuarios/Dashboard.php");
      
      if (response?.data?.InformacoesBasicas) {
        const info = response.data.InformacoesBasicas;
        const userData: UserData = {
          avatar: `${RotaApi}/Backend/usuarios/avatar/${info.Avatar}`,
          nome: info.NomeDoUsuario,
          email: info.email,
          tipoDeUsuario: info.TipoDeUsuario,
        };
        
        setAuth(prevAuth => ({
          ...prevAuth,
          user: userData
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    }
  }, []);

  const verificaToken = useCallback(async (token: string) => {
    try {
      const response = await requisicaoPost(`/Auth/Token/valida-jwt.php`, { token });
  
      if (!response || !response.data.success) {
        Alerta("swal", "error", `${response?.data?.error || "Erro desconhecido"}`);
        logout();
      } else {
        // ← ADICIONE ESTAS LINHAS
        if (!auth.user) {
          await carregarDadosUsuario();
        }
      }
    } catch (error) {
      Alerta("swal", "error", `${error}`);
      logout();
    }
  }, [auth.user, carregarDadosUsuario]); // ← ADICIONE auth.user e carregarDadosUsuario

  // Efeito que roda quando o token muda
  useEffect(() => {
    if (auth.token) {
      verificaToken(auth.token);
    }
  }, [auth.token, verificaToken]);

  // Função de login
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setAuth({ token, loggedIn: true, user: null }); // ← ADICIONE user: null
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, loggedIn: false, user: null }); // ← ADICIONE user: null
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};