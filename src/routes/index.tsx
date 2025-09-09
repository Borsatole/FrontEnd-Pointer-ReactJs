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

//condominios
const Condominios = lazy(() => import("./condominios/condominios"));

// visitas
const Visitas = lazy(() => import("./visitas/visita"));




const routes = [
  { path: "/", element: <Home />, protected: true },

  // login não é protegido
  { path: "/login", element: <TelaLogin />, protected: false },

  // Condominios
  { path: "/condominios", element: <Condominios />, protected: true },

  // Visitas
  { path: "/visitas", element: <Visitas />, protected: true },

  
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
