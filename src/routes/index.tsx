import { Suspense, lazy, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Spinner } from "flowbite-react";
import Alerta from "@src/components/comum/alertas";
import { AuthContext } from "@src/context/AuthContext";
import DefaultLayout from "@src/layouts/DefaultLayout";

function TelaLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
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
const Home = lazy(() => import("./dashboard/dashboard"));
const NivelAcesso = lazy(() => import("./acessos/nivel"));

const routes = [
  { path: "/", element: <Home />, protected: true },
  { path: "/login", element: <TelaLogin />, protected: false },
  { path: "/acesso-niveis", element: <NivelAcesso />, protected: true },
  { path: "/peixes", element: <NivelAcesso />, protected: true },
];

function AcessoNegado() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    Alerta("swal", "error", "Voce nao tem permissao para acessar essa rota!");
  }, [navigate]);

  return null;
}

function RotaNaoEncontrada() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    Alerta("toast", "error", "Rota nao encontrada!");
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
  const { auth } = useContext(AuthContext);

  // Separa rotas protegidas e não protegidas
  const rotasProtegidas = routes.filter((route) => route.protected);
  const rotasPublicas = routes.filter((route) => !route.protected);

  return (
    <Suspense fallback={<TelaLoading />}>
      <Routes>
        {/* Rotas públicas (sem layout) */}
        {rotasPublicas.map(({ path, element }, index) => (
          <Route key={`public-${index}`} path={path} element={element} />
        ))}

        {/* Rotas protegidas (com DefaultLayout) */}
        <Route
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }
        >
          {rotasProtegidas.map(({ path, element }, index) => {
            const isPermitida = rotaPermitida(auth?.menu || [], path);
            return (
              <Route
                key={`protected-${index}`}
                path={path}
                element={isPermitida ? element : <AcessoNegado />}
              />
            );
          })}
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<RotaNaoEncontrada />} />
      </Routes>
    </Suspense>
  );
};

export default Rotas;