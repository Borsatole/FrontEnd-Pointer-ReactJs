import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Loading from "../components/loader/Loading";

function TelaLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loading color="var(--text-color)" />
        <span
          className="text-gray-600 text-sm animate-pulse"
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

//estoque
const EstoqueControle = lazy(() => import("./estoque/controle-estoque"));
const EstoqueCategorias = lazy(() => import("./estoque/categorias"));

//financeiro
const Financeiro = lazy(() => import("./financeiro/financeiro"));
const FinanceiroContasAPagar = lazy(() => import("./financeiro/financeiro-contas-a-pagar"));
const FinanceiroContasAReceber = lazy(() => import("./financeiro/financeiro-contas-a-receber"));
const ContasFixas = lazy(() => import("./financeiro/contas-fixas/contas-fixas"));
const FinanceiroCategorias = lazy(() => import("./financeiro/financeiro-categorias"));


const routes = [
  { path: "/", element: <Home />, protected: true },

  // login não é protegido
  { path: "/login", element: <TelaLogin />, protected: false },

  // rotas do financeiro
  { path: "/financeiro", element: <Financeiro />, protected: true },
  { path: "/financeiro-contas-a-pagar", element: <FinanceiroContasAPagar />, protected: true },
  { path: "/financeiro-contas-a-receber", element: <FinanceiroContasAReceber />, protected: true },
  { path: "/financeiro-contas-fixas", element: <ContasFixas />, protected: true },
  { path: "/financeiro-categorias", element: <FinanceiroCategorias />, protected: true },

  // rotas de estoque
  { path: "/estoque", element: <EstoqueControle />, protected: true },
  { path: "/estoque-categorias", element: <EstoqueCategorias />, protected: true },
];

const Rotas = () => {
  return (
    <Suspense fallback={<TelaLoading />}>
      <Routes>
        {routes.map(({ path, element, protected: isProtected }, index) => (
          <Route
            key={index}
            path={path}
            element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Rotas;
