import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import {GrupoEstoque, ItemEstoque } from '@src/components/tipos';

interface EstoqueContextType {
  registros: GrupoEstoque[];
  setRegistros: Dispatch<SetStateAction<GrupoEstoque[]>>;
  relistar: boolean;
  setRelistar: Dispatch<SetStateAction<boolean>>;
  loadingSpiner: boolean;
  setLoadingSpiner: Dispatch<SetStateAction<boolean>>;
  selectedEstoque: ItemEstoque | null;
  setSelectedEstoque: Dispatch<SetStateAction<ItemEstoque | null>>;
  abrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: Dispatch<SetStateAction<boolean>>;
  abrirModalEditarRegistro: boolean;
  setAbrirModalEditarRegistro: Dispatch<SetStateAction<boolean>>;
  AbrirModalDetalhesRegistro: boolean;
  setAbrirModalDetalhesRegistro: Dispatch<SetStateAction<boolean>>;
}

const EstoqueContext = createContext<EstoqueContextType | undefined>(undefined);

export function EstoqueProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<GrupoEstoque[]>([]);
  const [relistar, setRelistar] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedEstoque, setSelectedEstoque] = useState<ItemEstoque | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] = useState(false);
  const [AbrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] = useState(false);

  return (
    <EstoqueContext.Provider value={{
      registros, 
      setRegistros,
      relistar, 
      setRelistar,
      loadingSpiner, 
      setLoadingSpiner,
      selectedEstoque, 
      setSelectedEstoque,
      abrirModalNovoRegistro, 
      setAbrirModalNovoRegistro,
      abrirModalEditarRegistro,
      setAbrirModalEditarRegistro,
      AbrirModalDetalhesRegistro,
      setAbrirModalDetalhesRegistro

    }}>
      {children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  const context = useContext(EstoqueContext);
  if (!context) throw new Error('useClientes deve ser usado dentro de ClientesProvider');
  return context;
}