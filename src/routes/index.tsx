import { Suspense, lazy, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Loading from "../components/loader/Loading";
import Alerta from "@src/components/comum/alertas";
import { Alert, Spinner } from "flowbite-react";


import { AuthContext } from "@src/context/AuthContext";


function TelaLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* <Loading color="var(--text-color)" /> */}
        <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        <span
          className="text-[var(--text-color)] text-sm animate-pulse"
          style={{ color: "var(--text-color)" }}
        >
          Carregando...
        </span>
      </div>
    </div>
  );
}

const TelaLogin = lazy(() => import("./telaLogin"));

// home
const Home = lazy(() => import("./dashboard/dashboard"));


// Niveis e permissoes
const NivelAcesso = lazy(() => import("./acessos/nivel"));






const routes = [
  { path: "/", element: <Home />, protected: true },

  // login não é protegido
  { path: "/login", element: <TelaLogin />, protected: false },


  // Niveis e permissoes
  { path: "/acesso-niveis", element: <NivelAcesso />, protected: true },
  { path: "/peixes", element: <NivelAcesso />, protected: true },
  
];

function AcessoNegado() {
  const navigate = useNavigate();

  useEffect(() => {
    
    navigate("/")
    Alerta("swal", "error", "Voce nao tem permissao para acessar essa rota!");
  }, []);

  return null;

}


function RotaNaoEncontrada() {
  const navigate = useNavigate();

  useEffect(() => {
    Alerta("toast", "error", "Rota nao encontrada!");
    navigate("/");
  }, [navigate]);

  return null;
}


function rotaPermitida(menu: any[], path: string): boolean {
  for (const item of menu) {
    if (item.rota === path) return true;
    if (item.submenu && rotaPermitida(item.submenu, path)) return true;
  }
  return false;
}

const Rotas = () => {
  const { logout, auth } = useContext(AuthContext);

  const isPermitida = rotaPermitida(auth?.menu || [], location.pathname);
  return (
    <Suspense fallback={<TelaLoading />}>
      <Routes>
        {routes.map(({ path, element, protected: isProtected }, index) => (
          <Route
            key={index}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute>
                  {isPermitida ? element : <AcessoNegado />}
                </ProtectedRoute>
              ) : (
                element
              )
            }
          />
        ))}

        <Route path="*" element={<RotaNaoEncontrada />} />
      </Routes>
    </Suspense>
  );
};

export default Rotas;
