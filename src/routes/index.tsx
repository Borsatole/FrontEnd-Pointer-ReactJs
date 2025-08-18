import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Loading from "../components/loader/Loading";

function TelaLoading() {

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loading color="var(--text-color)" />
        <span className="text-gray-600 text-sm animate-pulse" style={{
          color: "var(--text-color)"
        }}>Carregando...</span>
      </div>
    </div>
  );
}

const TelaLogin = lazy(() => import("./telaLogin"));


// importando as rotas de estoque
const EstoqueControle = lazy(() => import("./estoque/controle-estoque"));
const EstoqueCategorias = lazy(() => import("./estoque/categorias"));

const Rotas = () => {
  return (
    <Suspense
      fallback={
        <TelaLoading />
      }
      
    >
      
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <EstoqueControle />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<TelaLogin />} />

        {/* rotas do financeiro */}
        <Route
          path="/financeiro"
          element={
            <ProtectedRoute>
              <EstoqueControle />
            </ProtectedRoute>
          }
        />

        <Route
          path="/financeiro-categorias"
          element={
            <ProtectedRoute>
              <EstoqueCategorias />
            </ProtectedRoute>
          }
        />



        {/* rotas de estoque */}
        <Route
          path="/estoque"
          element={
            <ProtectedRoute>
              <EstoqueControle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estoque-categorias"
          element={
            <ProtectedRoute>
              <EstoqueCategorias />
            </ProtectedRoute>
          }
        />

        

        

        
      </Routes>
    </Suspense>
  );
};

export default Rotas;
