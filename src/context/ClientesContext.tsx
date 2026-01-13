// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
// } from "react";
// import { Cliente } from "@src/components/tipos";

// interface ClientesContextType {
//   registros: Cliente[];
//   setRegistros: Dispatch<SetStateAction<any[]>>;
//   relistar: boolean;
//   setRelistar: Dispatch<SetStateAction<boolean>>;
//   loadingSpiner: boolean;
//   setLoadingSpiner: Dispatch<SetStateAction<boolean>>;
//   selectedCliente: Cliente | null;
//   setSelectedCliente: Dispatch<SetStateAction<Cliente | null>>;
//   abrirModalNovoRegistro: boolean;
//   setAbrirModalNovoRegistro: Dispatch<SetStateAction<boolean>>;
//   abrirModalEditarRegistro: boolean;
//   setAbrirModalEditarRegistro: Dispatch<SetStateAction<boolean>>;
// }

// const ClientesContext = createContext<ClientesContextType | undefined>(
//   undefined
// );

// export function ClientesProvider({ children }: { children: ReactNode }) {
//   const [registros, setRegistros] = useState<Cliente[]>([]);
//   const [relistar, setRelistar] = useState(true);
//   const [loadingSpiner, setLoadingSpiner] = useState(true);
//   const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
//   const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
//   const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] =
//     useState(false);

//   return (
//     <ClientesContext.Provider
//       value={{
//         registros,
//         setRegistros,
//         relistar,
//         setRelistar,
//         loadingSpiner,
//         setLoadingSpiner,
//         selectedCliente,
//         setSelectedCliente,
//         abrirModalNovoRegistro,
//         setAbrirModalNovoRegistro,
//         abrirModalEditarRegistro,
//         setAbrirModalEditarRegistro,
//       }}
//     >
//       {children}
//     </ClientesContext.Provider>
//   );
// }

// export function useClientes() {
//   const context = useContext(ClientesContext);
//   if (!context)
//     throw new Error("useClientes deve ser usado dentro de ClientesProvider");
//   return context;
// }
