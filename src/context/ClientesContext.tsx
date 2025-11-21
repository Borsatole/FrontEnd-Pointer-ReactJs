import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Cliente } from '@src/components/tipos';

interface ClientesContextType {
  registros: Cliente[];
  setRegistros: Dispatch<SetStateAction<Cliente[]>>; // ✅ Tipo correto
  relistar: boolean;
  setRelistar: Dispatch<SetStateAction<boolean>>; // ✅ Tipo correto
  loadingSpiner: boolean;
  setLoadingSpiner: Dispatch<SetStateAction<boolean>>; // ✅ Tipo correto
  selectedCliente: Cliente | null;
  setSelectedCliente: Dispatch<SetStateAction<Cliente | null>>; // ✅ Tipo correto
  abrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: Dispatch<SetStateAction<boolean>>; // ✅ Tipo correto
}

const ClientesContext = createContext<ClientesContextType | undefined>(undefined);

export function ClientesProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<Cliente[]>([]);
  const [relistar, setRelistar] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);

  return (
    <ClientesContext.Provider value={{
      registros, 
      setRegistros,
      relistar, 
      setRelistar,
      loadingSpiner, 
      setLoadingSpiner,
      selectedCliente, 
      setSelectedCliente,
      abrirModalNovoRegistro, 
      setAbrirModalNovoRegistro
    }}>
      {children}
    </ClientesContext.Provider>
  );
}

export function useClientes() {
  const context = useContext(ClientesContext);
  if (!context) throw new Error('useClientes deve ser usado dentro de ClientesProvider');
  return context;
}