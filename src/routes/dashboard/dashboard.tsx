import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/context/AuthContext";
import { TituloPagina } from "@components/comum/Textos";
import DefaultLayout from "@src/layouts/DefaultLayout";
import { UltimaVisita } from "@src/components/condominios/tipos";
import { requisicaoGet } from "@src/services/requisicoes";
import { Datas } from "@src/services/funcoes-globais";
import dayjs from 'dayjs';
import { Spinner } from "flowbite-react";


export default function Dashboard() {
  const { dataFormataComHora } = Datas();

  const now = dayjs();
  const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');

  const lastMonth = now.subtract(1, "week").format("YYYY-MM-DD");
  

  // Estados principais
  const [registros, setRegistros] = useState<UltimaVisita[]>([]);
  const [totalResultados, setTotalResultados] = useState(0);

  // Estados de controle
  const [relistar, setRelistar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);

  // Buscar dados da API
  useEffect(() => {
    setLoadingSpiner(true);

    const params = new URLSearchParams({
      data_minima: lastMonth,
    });
    requisicaoGet(`/condominios/visitas/UltimasVisitas.php?${params.toString()}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.Registros);
          setTotalResultados(response.data.total_registros);
        }

        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);
      });
  }, [relistar]);

  if (!registros) return null;

  return (
    <DefaultLayout>
      <TituloPagina>Dashboard</TituloPagina>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-[var(--corPrincipal)] to-[var(--corPrincipal)]/60 rounded-full"></div>
          <span className="text-xl font-bold text-[var(--text-color)] tracking-tight">
            Últimas Visitas Registradas
          </span>
        </div>
        
      </div>

      <div className="mt-8">
        <div className="relative">
          {/* Linha principal da timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--corPrincipal)]/30 via-[var(--corPrincipal)]/20 to-transparent"></div>
          
          <div className="space-y-6">
            {registros.map((registro, index) => (
              <div key={registro.id} className="cursor-pointer relative flex items-start gap-6 group">
                {/* Ponto da timeline */}
                <div className="relative z-3 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--corPrincipal)] to-[var(--corPrincipal)]/80 rounded-full shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),_0_4px_6px_-4px_rgb(0_0_0_/_0.1),_0_0_0_1px_var(--corPrincipal)/20] flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Card do conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="bg-[var(--base-variant)] backdrop-blur-sm border border-[var(--corPrincipal)]/10 rounded-xl p-5 shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:shadow-[0_10px_15px_-3px_var(--corPrincipal)/10,_0_4px_6px_-4px_var(--corPrincipal)/5] transition-all duration-200 group-hover:translate-x-1">
                    <div className="flex items-center justify-between mb-2">
                      <time className="inline-flex items-center px-3 py-1 text-xs font-medium text-[var(--corPrincipal)] bg-[var(--corPrincipal)]/10 rounded-full">
                        {dataFormataComHora(registro.entrada)}
                      </time>
                      {index === 0 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-[var(--corPrincipal)] bg-[var(--corPrincipal)]/10 rounded-full">
                          Mais recente
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-[var(--text-color)] leading-tight group-hover:text-[var(--corPrincipal)] transition-colors">
                      {registro.nome_condominio}
                    </h3>
                    
                    {/* Linha decorativa */}
                    <div className="mt-3 h-0.5 w-12 bg-gradient-to-r from-[var(--corPrincipal)] to-transparent rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
    </DefaultLayout>
  );
}