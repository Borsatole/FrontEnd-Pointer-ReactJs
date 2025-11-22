import dayjs from "dayjs";
import Modal from "@components/modal/Modal";
import { ItemEstoque } from "@src/components/tipos";
import { Button } from "@components/comum/button";
import { useState } from "react";
import { H2 } from "@components/comum/Textos";
import { Input } from "@components/comum/input";
import { Update } from "@src/services/crud2";
import { useEstoque } from "@src/context/EstoqueContext";

function RetiradaRegistro() {

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

  const [dataRetirada, setDataRetirada] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedRegistro?.id) return;

      const dataConvertida = dayjs(dataRetirada).format("YYYY-MM-DD");
  
      setIsLoading(true);
      try {
        const payload = {
          data_retirada: dataConvertida,
          status: "finalizado",
        };

        Update<any>({
          payload,
          antesDeExecutar : () => {
            setIsLoading(true);
          },
          depoisDeExecutar : () => {
            setRelistar(true);
            setSelectedRegistro(null);
            setIsLoading(false);
          },
          endpoint: `/locacoes/${selectedRegistro?.dados_locacao?.locacao_id}`,
        });

        setSelectedRegistro(null);
      } finally {
        setIsLoading(false);
      }
    };

  const dadosLocacao = Array.isArray(selectedRegistro.dados_locacao)
    ? null
    : selectedRegistro.dados_locacao;

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-[50vh]">
      <div className="p-4">
        
        {/* Cabeçalho */}
        <H2 className="text-center">Finalizar Locação</H2>

        {/* Card com detalhes */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl mt-4 p-4 shadow-md">

          <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Produto</p>
            <p className="text-lg dark:text-gray-100">
              {selectedRegistro.item}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Categoria</p>
            <p className="text-base text-gray-800 dark:text-gray-200">
              {selectedRegistro.categoria}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Cliente</p>
            <p className="text-base text-gray-800 dark:text-gray-200">
              {dadosLocacao?.cliente_nome}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Valor Total</p>
            <p className="text-base text-gray-800 dark:text-gray-200">
              R$ {dadosLocacao?.preco_total ?? "-"}
            </p>
          </div>

        </div>

        {/* Campo de data */}
        <div className="mt-6 mb-6">
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
            Data da retirada
          </label>

          <Input
            id="data-retirada"
            type="date"
            value={dayjs(dataRetirada).format("YYYY-MM-DD")}
            onChange={(e) => setDataRetirada(dayjs(e.target.value).toDate())}
            className="w-full"
          />
        </div>

        {/* Botão */}
        <Button
          className="w-full"
          onClick={(e) => {
            if (!dataRetirada) return;
            handleSubmit(e);
          }}
        >
          Finalizar Locação
        </Button>

      </div>
    </Modal>
  );
}

export default RetiradaRegistro;
