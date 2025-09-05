import { useEffect, useState } from "react";
import { HiCheck, HiEye } from "react-icons/hi";
import { Registros } from "../tipos";
import { IoIosNotifications } from "react-icons/io";

import { handleDeletar, editarRegistro, adicionarRegistro } from "@src/services/Crud";


// Modelo de cada notificação
interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  avatar?: string;
  data?: string;
}

// Props do componente
interface NotificacoesProps {
  selectedProduto: Registros | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Registros | null>>;
  registros: Registros[];
  setRegistros: React.Dispatch<React.SetStateAction<Registros[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}


export function Notificacoes({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setRelistar,
  setLoadingSpiner
}: NotificacoesProps) {
  
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);


  // Busca registro atual
  const registro = registros.find((p) => p.id === selectedProduto?.id);

  if (!registro) return null;

  useEffect(() => {
    if (registro) {
      setNotificacoes(registro.notificacoes as Notificacao[]);
    }

  }, [registro]);



  

  const [expandida, setExpandida] = useState<number | null>(null);

  const marcarLida = async (id: number) => {
  setNotificacoes((prev) =>
    prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
  );

  const data = {
    nome: registro?.notificacoes.find((n) => n.id === id)?.titulo,
    id: id,
    lida: true
};
 

  await handleDeletar({
    registro: data,
    setRelistar,
    endpoint: "/condominios/notificacoes/Delete.php",
  });

  setRelistar(true);
};


  const toggleExpandir = (id: number) => {
    setExpandida(expandida === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {notificacoes.map((n) => (
        <div
          key={n.id}
          className={`
            p-4 rounded-lg border transition-all duration-200 hover:shadow-md
            ${
              n.lida
                ? 'bg-[var(--base-color)] border-[var(--base-variant)] opacity-20'
                : 'bg-[var(--base-color)] border-[var(--corPrincipal)]/30  shadow-sm'
            }
          `}
        >
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="relative shrink-0 p-1 bg-[var(--base-variant)] rounded-full">
              <IoIosNotifications  size={30}/>
              {!n.lida && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--corPrincipal)] rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-sm font-medium ${
                  n.lida 
                    ? 'text-[var(--text-color)]' 
                    : 'text-[var(--text-color)]'
                }`}>
                  {n.titulo}
                </h3>
                <span className="text-xs  shrink-0 ml-2">{n.data}</span>
              </div>
              
              <p className={`text-xs ${
                expandida === n.id ? '' : 'line-clamp-2'
              } ${
                n.lida
                  ? 'text-gray-500 '
                  : 'text-gray-500 '
              }`}>
                {n.mensagem}
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex items-center space-x-1 shrink-0">
              {/* Botão ver mensagem completa */}
              <button
                onClick={() => toggleExpandir(n.id)}
                className="p-1.5 hover:text-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/10 rounded-full transition-colors"
                title={expandida === n.id ? "Recolher mensagem" : "Ver mensagem completa"}
              >
                <HiEye className={`w-4 h-4 transition-transform ${expandida === n.id ? 'rotate-180' : ''}`} />
              </button>

              {/* Botão marcar como lida */}
              {!n.lida && (
                <button
                  onClick={() => marcarLida(n.id)}
                  className="p-1.5 hover:text-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/10 rounded-full transition-colors"
                  title="Marcar como lida"
                >
                  <HiCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

    
    </div>
  );
}