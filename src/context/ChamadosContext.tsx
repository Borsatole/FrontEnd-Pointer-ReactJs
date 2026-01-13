import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ChamadosContextType {
  registros: any[];
  setRegistros: Dispatch<SetStateAction<any[]>>;
  relistar: boolean;
  setRelistar: Dispatch<SetStateAction<boolean>>;
  loadingSpiner: boolean;
  setLoadingSpiner: Dispatch<SetStateAction<boolean>>;
  selectedRegistro: any | null;
  setSelectedRegistro: Dispatch<SetStateAction<any | null>>;
  abrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalEditarRegistro: boolean;
  setAbrirModalEditarRegistro: Dispatch<SetStateAction<boolean>>;
}

const ChamadosContext = createContext<ChamadosContextType | undefined>(
  undefined
);

export function ChamadosProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<any[]>([]);
  const [relistar, setRelistar] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState<any | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] =
    useState(false);

  return (
    <ChamadosContext.Provider
      value={{
        registros,
        setRegistros,
        relistar,
        setRelistar,
        loadingSpiner,
        setLoadingSpiner,
        selectedRegistro,
        setSelectedRegistro,
        abrirModalNovoRegistro,
        setAbrirModalNovoRegistro,
        abrirModalEditarRegistro,
        setAbrirModalEditarRegistro,
      }}
    >
      {children}
    </ChamadosContext.Provider>
  );
}

export function useChamados() {
  const context = useContext(ChamadosContext);
  if (!context)
    throw new Error("useClientes deve ser usado dentro de ClientesProvider");
  return context;
}
