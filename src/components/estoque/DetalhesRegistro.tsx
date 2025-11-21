import dayjs from "dayjs";
import Modal from "@components/modal/Modal";
import { Button } from "../comum/button";



interface DetalhesRegistroProps {
  selectedProduto: any;
  setSelectedProduto: any;
  
}
function DetalhesRegistro({ selectedProduto, setSelectedProduto }:DetalhesRegistroProps) {
  if (!selectedProduto) return null;

  const fecharModal = () => setSelectedProduto(null);

  const loc = selectedProduto.dados_locacao ?? null;

  const dataInicio = loc ? dayjs(loc.data_inicio).format("DD/MM/YYYY") : "-";
  const dataFim = loc ? dayjs(loc.data_fim).format("DD/MM/YYYY") : "-";

  const retiradaHoje = loc && dayjs(loc.data_fim).isSame(dayjs(), "day");
  const atrasado = loc && dayjs().isAfter(dayjs(loc.data_fim), "day");

  const badgeStatusItem =
    selectedProduto.status === "disponivel"
      ? "bg-green-600"
      : selectedProduto.status === "locado"
      ? "bg-orange-600"
      : "bg-gray-600";

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <div className="p-4 space-y-6">

        {/* --------------------------------------------- */}
        {/* 🔥 TÍTULO */}
        {/* --------------------------------------------- */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Detalhes da Locaçao
        </h2>

        {/* --------------------------------------------- */}
        {/* 🔥 CARD: DADOS DO ITEM */}
        {/* --------------------------------------------- */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3">Dados do Item</h3>

          <div className="grid grid-cols-2 gap-4">
            <Info label="Código" value={selectedProduto.id} />
            <Info label="Item" value={selectedProduto.item} />
            <Info label="Categoria" value={selectedProduto.categoria} />
            <Info label="Preço diária" value={`R$ ${selectedProduto.preco_diaria}`} />
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Status</span>
              <span
                className={`${badgeStatusItem} text-white text-sm px-2 py-1 rounded font-semibold w-fit`}
              >
                {selectedProduto.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* --------------------------------------------- */}
        {/* 🔥 CARD: DADOS DA LOCAÇÃO */}
        {/* --------------------------------------------- */}
        {loc && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3">Dados da Locação</h3>

            <div className="grid grid-cols-2 gap-4">
              <Info label="Cliente" value={loc.cliente_nome} />
              <Info label="Início" value={dataInicio} />

              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Data de Retirada</span>

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
                <span className="text-xs text-gray-500 block">Observações</span>
                <p className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
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
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
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
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-base font-medium">{value}</span>
    </div>
  );
}
