import { Suspense, lazy, useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

const Condominios = lazy(() => import("./condominios/condominios"));
const PaginaCondominio = lazy(() => import("./condominios/PaginaCondominio"));
const PaginaVisitas = lazy(() => import("./condominios/PaginaVisitas"));
const PaginaVistorias = lazy(() => import("./condominios/PaginaVistorias"));
const PaginaItensVistorias = lazy(
  () => import("./condominios/PaginaItensVitorias"),
);

const Home = lazy(() => import("./dashboard/dashboard"));
const NivelAcesso = lazy(() => import("./acessos/nivel"));
const Renove = lazy(() => import("./renove/renove"));
const Vistorias = lazy(() => import("./vistorias/vistorias"));
const Chamados = lazy(() => import("./chamados/chamados"));
const PaginaChamados = lazy(() => import("./condominios/PaginaChamados"));

const Financeiro = lazy(() => import("./financeiro/financeiro"));
const FinanceiroCategorias = lazy(() => import("./financeiro/Categorias"));
const FinanceiroContasFixas = lazy(() => import("./financeiro/ContasFixas"));
const FinanceiroContasReceber = lazy(
  () => import("./financeiro/ContasReceber"),
);
const FinanceiroContasReceberNovo = lazy(
  () => import("./financeiro/ContaReceberNovo"),
);

const FinanceiroContasReceberEditar = lazy(
  () => import("./financeiro/ContaReceberEdit"),
);

const FinanceiroContasPagarNovo = lazy(
  () => import("./financeiro/ContaPagarNovo"),
);

const FinanceiroContasPagarEditar = lazy(
  () => import("./financeiro/ContaPagarEdit"),
);

const FinanceiroContasPagar = lazy(() => import("./financeiro/ContasPagar"));

const RegistroVisita = lazy(() => import("./registro-visita/registro-visita"));

const routes = [
  { path: "/", element: <Home />, protected: true },
  { path: "/login", element: <TelaLogin />, protected: false },
  { path: "/acesso-niveis", element: <NivelAcesso />, protected: true },

  { path: "/condominios", element: <Condominios />, protected: true },
  { path: "/condominios/:id", element: <PaginaCondominio />, protected: true },

  { path: "/visitas", element: <RegistroVisita />, protected: true },
  { path: "/visitas/:id", element: <PaginaVisitas />, protected: true },

  { path: "/vistorias", element: <Vistorias />, protected: true },
  { path: "/vistorias/:id", element: <PaginaVistorias />, protected: true },
  {
    path: "/vistorias/itens/:id",
    element: <PaginaItensVistorias />,
    protected: true,
  },

  { path: "/chamados", element: <Chamados />, protected: true },
  { path: "/chamados/:id", element: <PaginaChamados />, protected: true },

  { path: "/financeiro", element: <Financeiro />, protected: true },
  {
    path: "/financeiro/categorias",
    element: <FinanceiroCategorias />,
    protected: true,
  },
  {
    path: "/financeiro/contas-fixas",
    element: <FinanceiroContasFixas />,
    protected: true,
  },
  {
    path: "/financeiro/receber",
    element: <FinanceiroContasReceber />,
    protected: true,
  },
  {
    path: "/financeiro/pagar",
    element: <FinanceiroContasPagar />,
    protected: true,
  },
  {
    path: "/financeiro/pagar/create",
    element: <FinanceiroContasReceberNovo />,
    protected: true,
  },
  {
    path: "/financeiro/pagar/edit/:id",
    element: <FinanceiroContasReceberEditar />,
    protected: true,
  },
  {
    path: "/financeiro/receber/create",
    element: <FinanceiroContasReceberNovo />,
    protected: true,
  },
  {
    path: "/financeiro/receber/edit/:id",
    element: <FinanceiroContasReceberEditar />,
    protected: true,
  },

  { path: "/renove", element: <Renove />, protected: true },
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
  // Normaliza a rota (remove barra final, se existir)
  const rota = path !== "/" ? path.replace(/\/$/, "") : path;

  // Libera a rota /renove de qualquer forma
  if (rota === "/renove") return true;

  // Se não tiver menu, não libera outras rotas
  if (!menu || menu.length === 0) return false;

  // Busca dentro do menu/submenus
  for (const item of menu) {
    // Comparação exata
    if (item.rota === rota) return true;

    // Verifica se a rota do menu tem parâmetros dinâmicos (ex: /condominios/:id)
    if (item.rota && item.rota.includes(":")) {
      const regexPattern = item.rota.replace(/:[^/]+/g, "[^/]+");
      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(rota)) return true;
    }

    // Verifica se é uma subrota (ex: /condominios/123 pertence a /condominios)
    if (item.rota && rota.startsWith(item.rota + "/")) return true;

    if (item.submenu && rotaPermitida(item.submenu, rota)) return true;
  }

  return false;
}

const Rotas = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔒 Se menu estiver vazio e usuário não estiver na rota /renove, redireciona
  useEffect(() => {
    const menuVazio = !auth?.menu || auth.menu.length === 0;
    const rotaAtual = location.pathname;

    if (menuVazio && rotaAtual !== "/renove" && rotaAtual !== "/login") {
      navigate("/renove", { replace: true });
    }
  }, [auth?.menu, location.pathname, navigate]);

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
