import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { getIcon } from "../icons";
import { LetraMaiuscula } from "@src/services/funcoes-globais";
import { Update } from "@src/services/crud2";
import { useClientes } from "@src/context/ClientesContext";
import { useVistorias } from "@src/context/VistoriasContext";
import ListaVistoria from "./ListaVistoria";
import { ItemDeVistoria } from "../tipos";

export default function ModalEditarRegistro2() {
  const {
    registros,
    setRegistros,
    setRelistar,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
  } = useVistorias();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);

  const [itensDeVistoria, setItensDeVistoria] = useState<ItemDeVistoria[]>([]);

  // Campos controlados

  const registro = registros.find((p) => p.id === selectedRegistro?.id);

  // Preenche os campos quando abrir o modal
  useEffect(() => {
    if (!registro) return;

    setItensDeVistoria(registro.itens_vistoriados || []);

    setIsLoadingInit(false);
  }, [registro]);

  useEffect(() => {
    console.log(itensDeVistoria);
  }, [itensDeVistoria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegistro?.id) return;

    setIsLoading(true);

    try {
      const payload = {
        itens_vistoriados: itensDeVistoria,
      };
      console.log(payload);
      Update<any>({
        payload,
        registros,
        setRegistros,
        endpoint: `/vistorias/${selectedRegistro.id}`,
      });

      setSelectedRegistro(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedRegistro(null);

  if (!selectedRegistro) return null;

  if (isLoadingInit) {
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
      <div className="flex flex-col p-4 border-b border-[var(--base-color)] mb-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg bg-[var(--base-color)] flex items-center justify-center text-[var(--corPrincipal)] shadow-inner">
            {getIcon("vistorias", 48, "text-[var(--corPrincipal)]")}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--text-color)]">
              {`Vistoria - ${registro?.id || "-"}`}
            </h2>
            <p className="text-sm text-[var(--text-color)]/70">
              Edite ou visualize sua vistora.
            </p>
          </div>
        </div>
      </div>

      <ListaVistoria
        regItensCondominio={itensDeVistoria}
        setRegItensCondominio={setItensDeVistoria}
        preenchimentoAutomatico={false}
      />

      <div className="w-full flex justify-center">
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Salvar Vistoria
        </Button>
      </div>
    </Modal>
  );
}
