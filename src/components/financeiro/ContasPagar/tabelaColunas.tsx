import { ColunaConfig } from "@src/components/comum/TabelaDinamica";
import dayjs from "dayjs";

export const colunas: ColunaConfig<any>[] = [
  {
    key: "condominio",
    label: "CONDOMÍNIO",
    render: (registro) => registro.condominio?.nome || "-",
  },
  {
    key: "descricao",
    label: "DESCRIÇÃO",
    render: (registro) => {
      const desc = registro.descricao ?? "-";

      return (
        /* O segredo está na classe 'group' no elemento pai e 'group-hover:scale-100' no balão */
        <div className="relative flex justify-center items-center group max-w-[120px] mx-auto">
          {/* Texto encurtado na tabela */}
          <span className="truncate block w-full text-center cursor-help text-sm">
            {desc}
          </span>

          {/* O Tooltip flutuante que aparece no Hover */}
          {registro.descricao && (
            <div
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
              scale-0 group-hover:scale-100 transition-all duration-150 origin-bottom
              bg-gray-900 text-white text-xs rounded py-2 px-3 
              w-max max-w-[250px] whitespace-normal break-words shadow-lg z-50 pointer-events-none"
            >
              {desc}
              {/* Pequena setinha apontando para baixo */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      );
    },
  },
  {
    key: "categoria",
    label: "CATEGORIA",
    render: (registro) => {
      const categoria = registro.categoria;

      return (
        <div className="flex justify-center">
          <div
            className="flex items-center gap-2 
            bg-gradient-to-r 
            from-[var(--corPrincipal)]/30 
            to-[var(--corPrincipal)]/20
            rounded-full 
            px-2.5 py-1 md:px-4 md:py-1.5
            text-[10px] sm:text-xs font-semibold
            uppercase tracking-wide 
            shadow-md whitespace-nowrap"
          >
            <span>{categoria}</span>
          </div>
        </div>
      );
    },
  },
  {
    key: "valor",
    label: "VALOR",
    render: (registro) => registro.valor || "-",
  },
  {
    key: "status",
    label: "STATUS",
    render: (registro) => {
      const status = registro.status || "";

      return (
        <div className="flex justify-center">
          <div
            className={`flex items-center gap-2
            ${
              status.toLowerCase() === "concluido"
                ? "bg-green-600 text-white"
                : "bg-gradient-to-r from-[var(--corPrincipal)]/30 to-[var(--corPrincipal)]/20"
            }
            rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide shadow-md`}
          >
            <span>{status}</span>
          </div>
        </div>
      );
    },
  },
  {
    key: "data_movimentacao",
    label: "DATA",
    render: (registro) =>
      dayjs(registro.data_movimentacao).format("DD/MM/YYYY") ?? "-",
  },
];
