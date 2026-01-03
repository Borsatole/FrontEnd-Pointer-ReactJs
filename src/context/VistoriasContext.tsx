import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Condominio } from "@src/components/tipos";

interface VistoriasContextType {
  registros: Condominio[];
  setRegistros: Dispatch<SetStateAction<Condominio[]>>;
  relistar: boolean;
  setRelistar: Dispatch<SetStateAction<boolean>>;
  loadingSpiner: boolean;
  setLoadingSpiner: Dispatch<SetStateAction<boolean>>;
  selectedRegistro: Condominio | null;
  setSelectedRegistro: Dispatch<SetStateAction<Condominio | null>>;
  abrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalEditarRegistro: boolean;
  setAbrirModalEditarRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalDetalhesRegistro: boolean;
  setAbrirModalDetalhesRegistro: Dispatch<SetStateAction<boolean>>;
}

const VistoriasContext = createContext<VistoriasContextType | undefined>(
  undefined
);

export function VistoriasProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<Condominio[]>([]);
  const [relistar, setRelistar] = useState(false);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedRegistro, setSelectedRegistro] = useState<Condominio | null>(
    null
  );
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] =
    useState(false);
  const [abrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] =
    useState(false);

  return (
    <VistoriasContext.Provider
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
        abrirModalDetalhesRegistro,
        setAbrirModalDetalhesRegistro,
      }}
    >
      {children}
    </VistoriasContext.Provider>
  );
}

export function useVistorias() {
  const context = useContext(VistoriasContext);
  if (!context)
    throw new Error("useClientes deve ser usado dentro de ClientesProvider");
  return context;
}
