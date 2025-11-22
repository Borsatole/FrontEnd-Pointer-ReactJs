import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import {GrupoEstoque, ItemEstoque } from '@src/components/tipos';

interface DemandasContextType {
  registros: GrupoEstoque[];
  setRegistros: Dispatch<SetStateAction<GrupoEstoque[]>>;
  relistar: boolean;
  setRelistar: Dispatch<SetStateAction<boolean>>;
  loadingSpiner: boolean;
  setLoadingSpiner: Dispatch<SetStateAction<boolean>>;
  selectedRegistro: ItemEstoque | null;
  setSelectedRegistro: Dispatch<SetStateAction<ItemEstoque | null>>;
  abrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalEditarRegistro: boolean;
  setAbrirModalEditarRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalDetalhesRegistro: boolean;
  setAbrirModalDetalhesRegistro: Dispatch<SetStateAction<boolean>>;
}

const DemandasContext = createContext<DemandasContextType | undefined>(undefined);

export function DemandasProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<GrupoEstoque[]>([]);
  const [relistar, setRelistar] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedRegistro, setSelectedRegistro] = useState<ItemEstoque | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] = useState(false);
  const [abrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] = useState(false);

  return (
    <DemandasContext.Provider value={{
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
      setAbrirModalDetalhesRegistro

    }}>
      {children}
    </DemandasContext.Provider>
  );
}

export function useDemandas() {
  const context = useContext(DemandasContext);
  if (!context) throw new Error('Context deve ser usado dentro de Provider');
  return context;
}