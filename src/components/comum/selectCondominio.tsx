import { useVistorias } from "@src/context/VistoriasContext";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { Read } from "@src/services/crud2";
import React, { useEffect, useState } from "react";
import { SelectModificado } from "@src/components/comum/select";
import BotaoSeletor from "@src/components/comum/buttonSelected";
import { getIcon } from "@src/components/icons";
import { Button } from "@src/components/comum/button";

interface SelectCondominioProps {
  selectedCondominio: any;
  setSelectedCondominio: any;
  setAbrirSelecao: any;
  listaDeCondominios?: any[]; // Transformado em opcional
}

function SelectCondominio({
  selectedCondominio,
  setSelectedCondominio,
  setAbrirSelecao,
  listaDeCondominios,
}: SelectCondominioProps) {
  // Inicializa com a lista externa (se houver) ou um array vazio
  const [registros, setRegistros] = useState<any[]>(listaDeCondominios || []);

  // Pré-seleciona visualmente o condomínio que já estava ativo anteriormente
  const [selecionado, setSelecionado] = useState<any>(
    selectedCondominio || null,
  );

  // Efeito 1: Sincroniza se a lista externa mudar/chegar depois
  useEffect(() => {
    if (listaDeCondominios && listaDeCondominios.length > 0) {
      setRegistros(listaDeCondominios);
    }
  }, [listaDeCondominios]);

  // Efeito 2: BUSCA HÍBRIDA - Só bate na API se NÃO recebeu os dados via props
  useEffect(() => {
    const temListaExterna = listaDeCondominios && listaDeCondominios.length > 0;

    if (!temListaExterna) {
      // Se não tem lista injetada, faz o fetch na API
      Read({
        endpoint: "/condominios",
        setRegistros,
      });
    }
  }, [listaDeCondominios]); // Monitora a propriedade externa

  return (
    <div className="flex flex-col max-h-[550px]">
      <div
        className="
    grid grid-cols-1 md:grid-cols-2 gap-2
    overflow-y-auto p-2 max-h-[450px]
    scroll-custom
  "
      >
        {registros.length === 0 ? (
          <div className="col-span-2 text-center py-4 text-sm text-gray-500">
            Nenhum condomínio encontrado...
          </div>
        ) : (
          registros.map((item: any, index) => (
            <BotaoSeletor
              key={item.id || index}
              icon={getIcon("condominios", 25)}
              value={item.id}
              selectedValue={selecionado?.id}
              onClick={() => setSelecionado(item)}
              label={item.nome}
            />
          ))
        )}
      </div>

      <div className="sticky bottom-0 bg-[var(--base-variant)] p-2 mt-2 border-t border-[var(--base-color)] flex justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <Button
          disabled={!selecionado}
          onClick={() => {
            setSelectedCondominio(selecionado);
            setAbrirSelecao(false);
          }}
          className="w-full sm:w-auto"
        >
          Selecionar
        </Button>
      </div>
    </div>
  );
}

export default SelectCondominio;
