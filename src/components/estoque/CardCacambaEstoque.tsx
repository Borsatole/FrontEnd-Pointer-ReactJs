import { getIcon } from "@src/components/icons";
import { ItemEstoque } from "../tipos";
import dayjs from "dayjs";

interface CardCacambaEstoqueProps {
  item: ItemEstoque;
  setSelectedRegistro: React.Dispatch<React.SetStateAction<ItemEstoque | null>>;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalDetalhesRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalRegistrarRetirada: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalRegistrarLocacao: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CardCacambaEstoque({
  item,
  setSelectedRegistro,
  setAbrirModalNovoRegistro,
  setAbrirModalDetalhesRegistro,
  setAbrirModalRegistrarRetirada,
  setAbrirModalRegistrarLocacao,
}: CardCacambaEstoqueProps) {

  const dados = item.dados_locacao && !Array.isArray(item.dados_locacao)
    ? item.dados_locacao
    : null;

  const isAlugado = item?.status === "locado";

  const dataInicioFormatada = dados?.data_inicio
    ? dayjs(dados.data_inicio).format("DD/MM/YYYY")
    : "-";

  const dataFimFormatada = dados?.data_fim
    ? dayjs(dados.data_fim).format("DD/MM/YYYY")
    : "-";

  const atrasado =
    dados?.data_fim && dayjs(dados.data_fim).isBefore(dayjs(), "day");

  const retiradaHoje =
    dados?.data_fim && dayjs(dados.data_fim).isSame(dayjs(), "day");

  const statusConfig = {
    locado: {
      label: "locado",
      bg: "bg-orange-100 text-orange-700 border-orange-200",
    },
    disponivel: {
      label: "disponível",
      bg: "bg-green-100 text-green-700 border-green-200",
    },
    indisponivel: {
      label: "indisponível",
      bg: "bg-red-100 text-red-700 border-red-200",
    },
  };

  return (
    <div
      className="w-full max-w-md rounded-xl border p-4 cursor-pointer
      bg-[var(--base-variant)] border-[var(--base-color)]
      shadow-sm hover:shadow-md hover:-translate-y-1
      transition-all duration-300 ease-in-out"
    >

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
              isAlugado
                ? "bg-orange-100 text-orange-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {getIcon("estoque", 22)}
          </div>

          <div>
            <h3 className="text-sm font-semibold">{item.item}</h3>
            <p className="text-xs text-gray-500">{item.categoria}</p>
          </div>
        </div>

        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${statusConfig[item.status].bg}`}
        >
          {statusConfig[item.status].label}
        </span>
      </div>

      {/* Lista */}
      <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1 mb-3">

        <div className="flex justify-between">
          <span>Localização:</span>
          <span className="font-medium">{dados?.bairro || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Cliente:</span>
          <span className="font-medium">{dados?.cliente_nome || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Entrega:</span>
          <span className="font-medium">{dataInicioFormatada}</span>
        </div>

        <div className="flex justify-between">
          <span>Retirada:</span>
          <span
            className={`font-medium ${
              retiradaHoje
                ? "bg-green-600 text-white px-2 py-0.5 rounded"
                : atrasado
                ? "bg-red-600 text-white px-2 py-0.5 rounded"
                : ""
            }`}
          >
            {retiradaHoje
              ? "Retirada hoje"
              : atrasado
              ? "Atrasado"
              : dataFimFormatada}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Pagamento:</span>
          <span className="font-medium">
            {dados?.preco_total && dados?.forma_pagamento
              ? `${dados.preco_total} | ${dados.forma_pagamento}`
              : "-"}
          </span>
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex justify-end gap-2">
        
        

        {isAlugado ? (
          <>

          <button
            onClick={() => {
              setSelectedRegistro(item); 
              setAbrirModalDetalhesRegistro(true);
              
            }}
            className="cursor-pointer
            border-orange-300 text-orange-700 text-xs font-medium px-3 py-1 rounded-md border hover:bg-orange-50"
          >
            Ver Detalhes
          </button>

          <button
          onClick={() => {
              setSelectedRegistro(item); 
              setAbrirModalRegistrarRetirada(true);
            }}
          className="cursor-pointer text-xs font-medium px-3 py-1 rounded-md border border-orange-300 text-orange-700 hover:bg-orange-50">
            Registrar Retirada
          </button>

          
          </>
        ) : (
          <>
            

          <button 
          onClick={() => {
              setSelectedRegistro(item); 
              setAbrirModalNovoRegistro(true);
            }}
          className="cursor-pointer text-xs font-medium px-3 py-1 rounded-md border border-green-300 text-green-700 hover:bg-green-50">
              Registrar Locação
            </button>
          </>
          
        )}
      </div>
    </div>
  );
}

export default CardCacambaEstoque;
