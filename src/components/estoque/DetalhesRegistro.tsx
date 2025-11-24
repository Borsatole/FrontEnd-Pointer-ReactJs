import dayjs from "dayjs";
import Modal from "@components/modal/Modal";
import { Button } from "@components/comum/button";
import { useEstoque } from "@src/context/EstoqueContext";

function DetalhesRegistro() {

  const {
        registros, setRegistros,
        relistar, setRelistar,
        loadingSpiner, setLoadingSpiner,
        selectedRegistro, setSelectedRegistro,
        abrirModalNovoRegistro, setAbrirModalNovoRegistro,
        abrirModalEditarRegistro, setAbrirModalEditarRegistro
      } = useEstoque();

  if (!selectedRegistro) return null;

  const fecharModal = () => setSelectedRegistro(null);

  const loc = selectedRegistro.dados_locacao ?? null;

  const dataInicio = loc ? dayjs(loc.data_inicio).format("DD/MM/YYYY") : "-";
  const dataFim = loc ? dayjs(loc.data_fim).format("DD/MM/YYYY") : "-";

  const retiradaHoje = loc && dayjs(loc.data_fim).isSame(dayjs(), "day");
  const atrasado = loc && dayjs().isAfter(dayjs(loc.data_fim), "day");

  const badgeStatusItem =
    selectedRegistro.status === "disponivel"
      ? "bg-green-600"
      : selectedRegistro.status === "locado"
      ? "bg-orange-600"
      : "bg-gray-600";

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <div className="p-4 space-y-6">

        {/* --------------------------------------------- */}
        {/* 🔥 TÍTULO */}
        {/* --------------------------------------------- */}
        <h2 className="text-xl font-bold text-center">
          Detalhes da Locaçao
        </h2>

        {/* --------------------------------------------- */}
        {/* 🔥 CARD: DADOS DO ITEM */}
        {/* --------------------------------------------- */}
        <div className="bg-[var(--base-color)] p-4 rounded-xl shadow-md border border-[var(--base-variant)]">
          <h3 className="text-lg font-semibold mb-3">Dados do Item</h3>

          <div className="grid grid-cols-2 gap-4">
            <Info label="Código" value={selectedRegistro.id} />
            <Info label="Item" value={selectedRegistro.item} />
            <Info label="Categoria" value={selectedRegistro.categoria} />
 
            <div className="flex flex-col">
              <span className="text-xs">Status</span>
              <span
                className={`${badgeStatusItem} text-sm px-2 py-1 rounded font-semibold w-fit`}
              >
                {selectedRegistro.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* --------------------------------------------- */}
        {/* 🔥 CARD: DADOS DA LOCAÇÃO */}
        {/* --------------------------------------------- */}
        {loc && (
          <div className="bg-[var(--base-color)] p-4 rounded-xl shadow-md border border-[var(--base-variant)]">
            <h3 className="text-lg font-semibold mb-3">Dados da Locação</h3>

            <div className="grid grid-cols-2 gap-4">
              <Info label="Cliente" value={loc.cliente_nome} />
              <Info label="Início" value={dataInicio} />

              <div className="flex flex-col">
                <span className="text-xs">Data de Retirada</span>

                <span
                  className={`text-sm font-bold px-2 py-1 rounded w-fit ${
                    retiradaHoje
                      ? "bg-green-600 text-white"
                      : atrasado
                      ? "bg-red-600 text-white"
                      : ""
                  }`}
                >
                  {retiradaHoje
                    ? "Retirada hoje!"
                    : atrasado
                    ? `Atrasado - ${dataFim}`
                    : dataFim}
                </span>
              </div>

              <Info label="Preço total" value={`R$ ${loc.preco_total}`} />
              <Info label="Forma de pagamento" value={loc.forma_pagamento} />
            </div>

            {loc.observacoes && (
              <div className="mt-3">
                <span className="text-xs block">Observações da locação</span>
                <p className="bg-[var(--base-color)] rounded text-sm">
                  {loc.observacoes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------------- */}
        {/* 🔥 CARD: ENDEREÇO */}
        {/* --------------------------------------------- */}
        {loc && (
          <div className="bg-[var(--base-color)] p-4 rounded-xl shadow-md border border-[var(--base-variant)]">
            <h3 className="text-lg font-semibold mb-3">Endereço</h3>

            <div className="grid grid-cols-2 gap-4">
              <Info label="CEP" value={loc.cep} />
              <Info label="Cidade" value={`${loc.cidade} - ${loc.estado}`} />
              <Info label="Bairro" value={loc.bairro} />
              <Info label="Número" value={loc.numero} />
              <Info label="Logradouro" value={loc.logradouro} />
              <Info label="Complemento" value={loc.complemento ?? "-"} />

              
            </div>
          </div>
        )}

        {/* --------------------------------------------- */}
        {/* 🔥 BOTÃO */}
        {/* --------------------------------------------- */}
        <Button
          onClick={fecharModal}
          className="w-full"
        >
          Fechar
        </Button>
        
      </div>
    </Modal>
  );
}

export default DetalhesRegistro;

/* --------------------------------------------- */
/* 🔧 COMPONENTE DE INFO (PADRÃO BONITO)        */
/* --------------------------------------------- */

interface InfoProps {
  label: string;
  value: string | number;
}
function Info({ label, value }:InfoProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs">{label}</span>
      <span className="text-base font-medium">{value}</span>
    </div>
  );
}
