import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Button } from "@components/comum/button";
import ListaVistoria from "./ListaVistoria";
import { useVistorias } from "@src/context/VistoriasContext";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import RegistroVazio from "../comum/registroVazio";
import { Create, Read } from "@src/services/crud2";
import SelecionarCondominio from "./SelecionarCondominio";

function ModalAdicionarRegistro() {
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
  const [selectedCondominio, setSelectedCondominio] = useState<any>(null);
  const [itensDeVistoria, setItensDeVistoria] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        id_condominio: selectedCondominio,
        itens_vistoriados: itensDeVistoria,
      };

      Create<any>({
        payload: payload,
        endpoint: "/vistorias",
        // setRegistros,
        // registros,
        antesDeExecutar: () => {
          setLoadingSpiner(true);
        },
        depoisDeExecutar: () => {
          setAbrirModalNovoRegistro(false);
          setLoadingSpiner(false);

          setRelistar(true);
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const fecharModal = () => setAbrirModalNovoRegistro(false);

  useEffect(() => {
    if (relistar) return;
    if (!selectedCondominio) return;
    Read({
      endpoint: `/itensparavistorias`,
      queryFiltro: `id_condominio=${selectedCondominio}`,
      pagina,
      limitePorPagina,
      setRegistros: setItensDeVistoria,
      setTotalResultados,
      setTotalPaginas,
      setLoadingSpiner: setLoading,
      setLoading,
    });
  }, [selectedCondominio]);

  if (isLoadingInit || loading) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  if (!selectedCondominio) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <SelecionarCondominio
          selectedCondominio={selectedCondominio}
          setSelectedCondominio={setSelectedCondominio}
        />
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      {itensDeVistoria.length === 0 && <RegistroVazio />}

      {itensDeVistoria.length > 0 && (
        <ListaVistoria
          regItensCondominio={itensDeVistoria}
          setRegItensCondominio={setItensDeVistoria}
          preenchimentoAutomatico={false}
        />
      )}

      <Button
        onClick={handleSubmit}
        className="w-full mt-4"
        disabled={itensDeVistoria.length === 0}
      >
        Salvar
      </Button>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
