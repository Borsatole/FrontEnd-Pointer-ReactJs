import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { getIcon } from "../icons";
import { LetraMaiuscula } from "@src/services/funcoes-globais";
import { Create, Update } from "@src/services/crud2";
import ListaVistoria from "./ListaVistoria";
import { ImagemPreview, ItemDeVistoria } from "../tipos";
import { useChamados } from "@src/context/ChamadosContext";
import PreviewImagens from "../ImageUploader/PreviewImagens";
import Uploader from "../ImageUploader/Uploader";

export default function ModalEditarRegistro2() {
  const {
    registros,
    setRegistros,
    setRelistar,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
  } = useChamados();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  // Campos controlados
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<ImagemPreview[]>([]);
  const [imageToUpload, setImageToUpload] = useState<File[]>([]);
  const [progress, setProgress] = useState<number | null>(null);

  const registro = registros.find((p) => p.id === selectedRegistro?.id);

  // Preenche os campos quando abrir o modal
  useEffect(() => {
    // if (!registro) return;
    setTitulo(registro.titulo || "");
    setDescricao(registro.descricao || "");
    setImagens(registro.imagens || []);
    // setIsLoadingInit(false);
  }, [registro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registro) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);

    imageToUpload.forEach((file) => {
      formData.append("imagens[]", file);
    });

    try {
      Create({
        payload: formData,
        endpoint: `/chamados/${selectedRegistro.id}`,
        setProgress,
        // antesDeExecutar: () => setLoadingSpiner(true),
        depoisDeExecutar: () => {
          // setLoadingSpiner(false);
          setProgress(null);
          setRelistar(true);
          fecharModal();
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => {
    setSelectedRegistro(null);
  };

  if (!registro) return null;

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
            {getIcon("chamados", 48, "text-[var(--corPrincipal)]")}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--text-color)]">
              {`Chamado - ${registro?.id || "-"}`}
            </h2>
            <p className="text-sm text-[var(--text-color)]/70">
              Edite ou visualize sua vistora.
            </p>
          </div>
        </div>
      </div>

      <FormGroup label="Título" id="titulo">
        <Input
          value={titulo || ""}
          id="titulo"
          onChange={(e) => setTitulo(e.target.value)}
          className="bg-[var(--base-color)]"
        />
      </FormGroup>

      <FormGroup label="Descrição" id="descricao">
        <TextArea
          value={descricao || ""}
          id="descricao"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescricao(e.target.value)
          }
          className="bg-[var(--base-color)]"
        />
      </FormGroup>

      <Uploader
        imagens={imagens || []}
        setImagens={setImagens}
        imageToUpload={imageToUpload}
        setImageToUpload={setImageToUpload}
        setRelistar={setRelistar}
        progress={progress}
        loading={isLoading}
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
