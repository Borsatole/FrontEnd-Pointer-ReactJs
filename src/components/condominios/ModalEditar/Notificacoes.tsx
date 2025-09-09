import { useEffect, useState } from "react";
import { HiCheck, HiEye } from "react-icons/hi";
import { Notificacao, Registros } from "../tipos";
import { IoIosNotifications } from "react-icons/io";
import { Datas } from "@src/services/funcoes-globais";
import { handleDeletar, editarRegistro } from "@src/services/Crud";
import { MdDelete, MdMarkChatUnread } from "react-icons/md";
import Tooltip from "@src/components/tooltip/tooltipwrapper";

import { AiFillMessage } from "react-icons/ai";
import { requisicaoGet } from "@src/services/requisicoes";
import { Spinner } from "flowbite-react";


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
  const { primeiroDia, ultimoDia, dataFormataComHora, dataFormatada } = Datas();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [expandida, setExpandida] = useState<number | null>(null);

  const [relistarNotificacoes, setRelistarNotificacoes] = useState(false);
  const [loading, setLoading] = useState(true);

  

  // Busca registro atual
  const registro = registros.find((p) => p.id === selectedProduto?.id);

  
  // Função para marcar notificação como lida
  const marcarLida = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Evita expandir o card ao clicar no botão

    // Atualiza estado local imediatamente para UX responsivo
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );

    const data = { id, lida: true };

    try {
      await editarRegistro<Notificacao>({
        data,
        registros: registros as any,
        setRegistros: setRegistros as any,
        setSelected: () => {},
        setRelistar,
        setLoadingSpiner,
        endpoint: "/condominios/notificacoes/Update.php",
      });

    } catch (error) {
      // Em caso de erro, reverte o estado local
      setNotificacoes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, lida: false } : n))
      );
      console.error("Erro ao marcar notificação como lida:", error);
    } finally {
      setRelistarNotificacoes(true);
    }

  };

  const marcarNaoLida = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Evita expandir o card ao clicar no botão

    // Atualiza estado local imediatamente para UX responsivo
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );

    const data = { id, lida: false };

    try {
      await editarRegistro<Notificacao>({
        data,
        registros: registros as any,
        setRegistros: setRegistros as any,
        setSelected: () => {},
        setRelistar,
        setLoadingSpiner,
        endpoint: "/condominios/notificacoes/Update.php",
      });
    } catch (error) {
      // Em caso de erro, reverte o estado local
      setNotificacoes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, lida: false } : n))
      );
      console.error("Erro ao marcar notificação como lida:", error);
    }finally {
      setRelistarNotificacoes(true);
    }
  };

  // Função para deletar notificação
  const deletarNotificacao = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Evita expandir o card ao clicar no botão

    const notificacao = notificacoes.find((n) => n.id === id);
    if (!notificacao) return;

    const data = {
      nome: notificacao.titulo || "Notificação",
      id: id,
      lida: true
    };

    try {
      await handleDeletar({
        registro: data,
        setRelistar,
        endpoint: "/condominios/notificacoes/Delete.php",
      });
          } catch (error) {
      console.error("Erro ao deletar notificação:", error);
    } finally {
      setRelistarNotificacoes(true);
    }
  };

  // Função para alternar expansão do card
  const toggleExpandir = (id: number) => {
    setExpandida(expandida === id ? null : id);
  };


    // Buscar dados da API com filtro
    useEffect(() => {
    if (!registro) return; 
  
    setLoadingSpiner(true);
  
    const params = new URLSearchParams({
      id_condominio: registro.id.toString(),
    });
  
    requisicaoGet(`/condominios/notificacoes/Read.php?${params.toString()}`)
      .then((response) => {
        if (response?.data.success) {
          setNotificacoes(response.data.Registros);
        }
        setRelistarNotificacoes(false);
        setLoadingSpiner(false);
        setLoading(false);

      });
  }, [registro?.id, relistarNotificacoes]);


  // Early return se não há registro
  if (loading || !registro) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Spinner size="xl" className=" fill-[var(--corPrincipal)]" />
      </div>
    );
  }


  // Se não há notificações
  if (!notificacoes || notificacoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <IoIosNotifications size={48} className="mb-4 opacity-50" />
        <span className="text-lg font-medium">Nenhuma notificação</span>
        <span className="text-sm">Todas as notificações aparecerão aqui</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notificacoes
        .slice() // Cria uma cópia para não alterar o estado original
        .sort((a, b) => Number(a.lida) - Number(b.lida)) // Não lidas primeiro
        .map((notificacao) => (
          <div
            key={notificacao.id}
            className={`
              p-4 rounded-lg border transition-all duration-200 hover:shadow-md
              ${
                notificacao.lida
                  ? 'bg-[var(--base-color)] border-[var(--base-variant)]'
                  : 'bg-[var(--corPrincipal)]/10 border-[var(--corPrincipal)]/30 shadow-sm'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar com indicador de não lida */}
              <div className="relative shrink-0 p-1 bg-[var(--base-variant)] rounded-full">
                <AiFillMessage size={30} color="var(--corPrincipal)"/>

                {!notificacao.lida && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--corPrincipal)] rounded-full border-2 border-white" />
                )}
              </div>

              {/* Conteúdo principal */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-medium ${
                    notificacao.lida 
                      ? 'text-[var(--text-color)]' 
                      : 'text-[var(--text-color)] font-semibold'
                  }`}>
                    {notificacao.titulo || 'Notificação'}
                  </h3>
                  <span className="text-xs text-gray-500 shrink-0 ml-2">
                    {dataFormatada(notificacao.data)}
                  </span>
                </div>
                
                {/* Mensagem com expansão */}
                <p className={`text-xs ${
                  expandida === notificacao.id ? '' : 'line-clamp-2'
                } ${
                  notificacao.lida
                    ? 'text-gray-500' 
                    : 'text-gray-600'
                }`}>
                  {notificacao.mensagem || 'Sem conteúdo'}
                </p>

                {/* Botão para expandir se a mensagem for longa */}
                {notificacao.mensagem && notificacao.mensagem.length > 100 && (
                  <button
                    onClick={() => toggleExpandir(notificacao.id)}
                    className="text-xs text-[var(--corPrincipal)] hover:underline mt-1"
                  >
                    {expandida === notificacao.id ? 'Ver menos' : 'Ver mais'}
                  </button>
                )}
              </div>

              {/* Botões de ação */}
              <div className="flex items-center space-x-1 shrink-0">
                {/* Botão para expandir/recolher */}

                <Tooltip tooltip="Ver mensagem">
                <button
                  onClick={() => toggleExpandir(notificacao.id)}
                  className="cursor-pointer p-1.5 hover:text-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/10 rounded-full transition-colors"
                  
                >
                  <HiEye className={`w-4 h-4 transition-transform ${
                    expandida === notificacao.id ? 'rotate-180' : ''
                  }`} />
                </button>
                </Tooltip>

                

                {notificacao.lida? (
                  <>

                  <Tooltip tooltip="Marcar como nao lida">
                  <button
                    onClick={(e) => marcarNaoLida(notificacao.id, e)}
                    className="cursor-pointer p-1.5 hover:text-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/10 rounded-full transition-colors"
                    
                  >
                    <MdMarkChatUnread className="w-4 h-4" />

                  </button>
                  </Tooltip>
                
                  </>) : (
                  <>

                  <Tooltip tooltip="Marcar como lida">
                  <button
                    onClick={(e) => marcarLida(notificacao.id, e)}
                    className="cursor-pointer p-1.5 hover:text-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/10 rounded-full transition-colors"
                   
                  >
                    <HiCheck className="w-4 h-4" />
                  </button>
                  </Tooltip>
                
                  </>
                )}

                {/* Botão deletar */}
                <Tooltip tooltip="Deletar notificação">
                <button
                  onClick={(e) => deletarNotificacao(notificacao.id, e)}
                  className="cursor-pointer p-1.5 hover:text-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/10 rounded-full transition-colors"
                  
                >
                  <MdDelete className="w-4 h-4" />
                </button>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}