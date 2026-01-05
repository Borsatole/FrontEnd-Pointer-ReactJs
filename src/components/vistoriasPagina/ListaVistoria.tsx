import React, { useEffect } from "react";
import { FormGroup } from "@components/comum/FormGroup";

interface ListaVistoriaProps {
  regItensCondominio: any[];
  setRegItensCondominio: React.Dispatch<React.SetStateAction<any[]>>;
  preenchimentoAutomatico?: boolean; // ✅ nova prop opcional
}

const ListaVistoria: React.FC<ListaVistoriaProps> = ({
  regItensCondominio,
  setRegItensCondominio,
  preenchimentoAutomatico = true, // valor padrão é true
}) => {
  useEffect(() => {
    // ✅ Só executa se o preenchimento automático estiver ativado
    if (!preenchimentoAutomatico) return;

    const listaAtualizada = regItensCondominio.map((item) => {
      if (!item.situacao_encontrada) {
        if (item.situacao === "Conforme" || item.situacao === "Defeito") {
          return {
            ...item,
            situacao_encontrada: item.situacao,
          };
        }
      }
      return item;
    });

    const houveMudanca = listaAtualizada.some(
      (item, index) =>
        item.situacao_encontrada !==
        regItensCondominio[index].situacao_encontrada
    );

    if (houveMudanca) {
      setRegItensCondominio(listaAtualizada);
    }
  }, [regItensCondominio, setRegItensCondominio, preenchimentoAutomatico]);

  const atualizarSituacao = (
    index: number,
    situacao: "Conforme" | "Defeito"
  ) => {
    setRegItensCondominio((prev) => {
      const novaLista = [...prev];
      const itemAtual = { ...novaLista[index] };

      // 🔁 toggle
      if (itemAtual.situacao_encontrada === situacao) {
        // 🔥 remove a propriedade
        delete itemAtual.situacao_encontrada;
      } else {
        itemAtual.situacao_encontrada = situacao;
      }

      novaLista[index] = itemAtual;
      return novaLista;
    });
  };

  return (
    <FormGroup>
      {regItensCondominio.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 p-3 rounded-md mb-3 border border-[var(--base-color)]"
        >
          <label className="font-medium text-sm">{`${item.id} - ${item.nome_item}`}</label>

          <div className="flex gap-2">
            <Btn_conforme
              item={item}
              index={index}
              atualizarSituacao={atualizarSituacao}
            />

            <Btn_defeito
              item={item}
              index={index}
              atualizarSituacao={atualizarSituacao}
            />
          </div>
        </div>
      ))}
    </FormGroup>
  );
};

export default ListaVistoria;

interface Botoes {
  item: any;
  index: number;
  atualizarSituacao: (index: number, situacao: "Conforme" | "Defeito") => void;
}

function Btn_conforme({ item, index, atualizarSituacao }: Botoes) {
  return (
    <button
      type="button"
      onClick={() => atualizarSituacao(index, "Conforme")}
      className={`cursor-pointer flex-1 py-2 px-4 rounded-md font-medium ${
        item.situacao_encontrada === "Conforme"
          ? "bg-[var(--corPrincipal)] text-white shadow-md"
          : "bg-gray-300 text-gray-700 hover:bg-gray-200"
      }`}
    >
      ✓ Conforme
    </button>
  );
}

function Btn_defeito({ item, index, atualizarSituacao }: Botoes) {
  return (
    <button
      type="button"
      onClick={() => atualizarSituacao(index, "Defeito")}
      className={`cursor-pointer flex-1 py-2 px-4 rounded-md font-medium ${
        item.situacao_encontrada === "Defeito"
          ? "bg-red-500 text-white shadow-md"
          : "bg-gray-300 text-gray-700 hover:bg-gray-200"
      }`}
    >
      ✗ Defeito
    </button>
  );
}
