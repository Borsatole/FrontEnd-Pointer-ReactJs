import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import {Condominio} from '@src/components/tipos';

interface CondominiosContextType {
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

const CondominiosContext = createContext<CondominiosContextType | undefined>(undefined);

export function CondominiosProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<Condominio[]>([]);
  const [relistar, setRelistar] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedRegistro, setSelectedRegistro] = useState<Condominio | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] = useState(false);
  const [abrirModalDetalhesRegistro, setAbrirModalDetalhesRegistro] = useState(false);

  return (
    <CondominiosContext.Provider value={{
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
    </CondominiosContext.Provider>
  );
}

export function useCondominios() {
  const context = useContext(CondominiosContext);
  if (!context) throw new Error('useClientes deve ser usado dentro de ClientesProvider');
  return context;
}