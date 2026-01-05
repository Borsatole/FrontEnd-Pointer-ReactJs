import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { getIcon } from "../icons";
import { LetraMaiuscula } from "@src/services/funcoes-globais";
import { Update } from "@src/services/crud2";
import { useVistorias } from "@src/context/VistoriasContext";
import ListaVistoria from "./ListaVistoria";
import { ItemDeVistoria } from "../tipos";
import { SelectModificado } from "../comum/select";

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
  const [loadingBtn, setLoadingBtn] = useState(false);

  // Campos controlados
  const [nomeItem, setNomeItem] = useState<string>("");
  const [periodoDias, setPeriodoDias] = useState<string>("");
  const [ultimaVistoria, setUltimaVistoria] = useState<string>("");
  const [situacao, setSituacao] = useState<string>("");

  const registro = registros.find((p) => p.id === selectedRegistro?.id);

  // Preenche os campos quando abrir o modal
  useEffect(() => {
    if (!registro) return;

    setNomeItem(registro.nome_item || "");
    setPeriodoDias(registro.periodo_dias || "");
    setUltimaVistoria(registro.ultima_vistoria || "");
    setSituacao(registro.situacao || "");

    setIsLoadingInit(false);
  }, [registro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRegistro?.id) return;

    setIsLoading(true);

    try {
      const payload = {
        id_condominio: selectedRegistro.id_condominio,
        nome_item: nomeItem,
        periodo_dias: periodoDias || null,
        ultima_vistoria: ultimaVistoria || null,
        situacao: situacao,
      };
      Update<any>({
        payload,
        registros,
        setRegistros,
        endpoint: `/itensparavistorias/${selectedRegistro.id}`,
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
