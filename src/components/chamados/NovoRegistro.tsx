import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Button } from "@components/comum/button";

import { usePaginacao } from "@src/hooks/UsePaginacao";
import { Create, Read } from "@src/services/crud2";
import SelecionarCondominio from "./SelecionarCondominio";
import { useChamados } from "@src/context/ChamadosContext";
import { FormGroup } from "@components/comum/FormGroup";
import { Input, TextArea } from "@components/comum/input";
import Uploader from "@components/ImageUploader/Uploader";
import { ImagemPreview } from "@src/components/tipos";

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
  } = useChamados();

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

  // Campos controlados
  const [chamadoId, setChamadoId] = useState<number | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState<ImagemPreview[]>([]);
  const [imageToUpload, setImageToUpload] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("id_condominio", selectedCondominio);

    imageToUpload.forEach((file) => {
      formData.append("imagens[]", file);
    });

    Create({
      payload: formData,
      endpoint: "/chamados",
      antesDeExecutar: () => setLoadingSpiner(true),
      depoisDeExecutar: () => {
        setAbrirModalNovoRegistro(false);
        setLoadingSpiner(false);
        setRelistar(true);
      },
    });
  };

  const fecharModal = () => setAbrirModalNovoRegistro(false);

  // useEffect(() => {
  //   if (relistar) return;
  //   if (!selectedCondominio) return;
  //   Read({
  //     endpoint: `/chamados/${chamadoId}`,
  //     pagina,
  //     limitePorPagina,
  //     setRegistros,
  //     setTotalResultados,
  //     setTotalPaginas,
  //     setLoadingSpiner: setLoading,
  //     setLoading,
  //   });
  // }, [selectedCondominio]);

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
      {/* {itensDeVistoria.length === 0 && <RegistroVazio />} */}
      <form onSubmit={handleSubmit}>
        <FormGroup label="Titulo">
          <Input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </FormGroup>

        <FormGroup label="Descricao">
          <TextArea
            id="mensagem"
            label="Mensagem"
            value={descricao}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescricao(e.target.value)
            }
          />
        </FormGroup>

        <Uploader
          imagens={imagens}
          setImagens={setImagens}
          imageToUpload={imageToUpload}
          setImageToUpload={setImageToUpload}
          loading={false}
        />

        <Button type="submit" className="w-full mt-4" disabled={loadingSpiner}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}

export default ModalAdicionarRegistro;
