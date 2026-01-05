import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Button } from "@components/comum/button";
import { useVistorias } from "@src/context/VistoriasContext";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { Create, Read } from "@src/services/crud2";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import dayjs from "dayjs";
import { SelectModificado } from "@src/components/comum/select";
import { useParams } from "react-router-dom";
import Alerta from "@src/components/comum/alertas";

function ModalAdicionarRegistro() {
  const { id } = useParams();

  const {
    registros,
    setRegistros,
    relistar,
    setRelistar,
    loadingSpiner,
    setLoadingSpiner,
    abrirModalNovoRegistro,
    setAbrirModalNovoRegistro,
  } = useVistorias();

  const {
    pagina,
    limitePorPagina,
    totalPaginas,
    setTotalPaginas,
    totalResultados,
    setTotalResultados,
  } = usePaginacao();

  const [loading, setLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  // Campos controlados
  const [nomeItem, setNomeItem] = useState<string>("");
  const [periodoDias, setPeriodoDias] = useState<string>("");
  const [ultimaVistoria, setUltimaVistoria] = useState<string>("");
  const [situacao, setSituacao] = useState<string>("");

  useEffect(() => {
    setUltimaVistoria(dayjs().format("YYYY-MM-DDTHH:mm:ss"));
    setSituacao("Conforme");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeItem || !ultimaVistoria || !situacao) {
      Alerta("swal", "error", "Preencha todos os campos");
      return;
    }

    try {
      const payload = {
        id_condominio: id,
        nome_item: nomeItem,
        periodo_dias: periodoDias,
        ultima_vistoria: ultimaVistoria,
        situacao: situacao,
      };

      Create<any>({
        payload: payload,
        endpoint: "/itensparavistorias",
        // setRegistros,
        // registros,
        antesDeExecutar: () => {
          setLoadingBtn(true);
          // setLoadingSpiner(true);
        },
        depoisDeExecutar: () => {
          setAbrirModalNovoRegistro(false);
          // setLoadingSpiner(false);
          setLoadingBtn(false);

          setRelistar(true);
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const fecharModal = () => setAbrirModalNovoRegistro(false);

  if (isLoadingInit || loading) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      {/* {itensDeVistoria.length === 0 && <RegistroVazio />} */}

      <form action="" onSubmit={handleSubmit}>
        <div>
          <FormGroup label="Nome do item" id="nomeItem">
            <Input
              id="nomeItem"
              placeholder="Nome do item"
              value={nomeItem}
              onChange={(e) => {
                setNomeItem(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup label="Período de dias" id="periodoDias">
            <Input
              id="periodoDias"
              type="number"
              placeholder="Período de dias"
              value={periodoDias}
              onChange={(e) => {
                setPeriodoDias(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup label="Ultima vistoria" id="ultimaVistoria">
            <Input
              id="ultimaVistoria"
              placeholder="Ultima vistoria"
              type="datetime-local"
              value={ultimaVistoria}
              onChange={(e) => {
                setUltimaVistoria(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup label="Situacao" id="situacao">
            <SelectModificado
              id="situacao"
              value={situacao}
              onChange={(e) => {
                setSituacao(e.target.value);
              }}
            >
              <option value="Conforme">Conforme</option>
              <option value="Defeito">Defeito</option>
            </SelectModificado>
          </FormGroup>

          <Button type="submit" loading={loadingBtn} className="w-full mt-4">
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
