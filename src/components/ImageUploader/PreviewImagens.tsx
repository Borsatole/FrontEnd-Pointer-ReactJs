import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Alerta, { Confirm } from "../comum/alertas";
import VerImagem from "./VerImagem";
import { ImagemApi, ImagemPreview } from "@src/components/tipos";
import { requisicaoDelete } from "@src/services/requisicoes";

interface PreviewImagensProps {
  endpoint?: string;
  imagens: any[];
  setImagens: React.Dispatch<React.SetStateAction<any[]>>;
}

function PreviewImagens({
  endpoint,
  imagens,
  setImagens,
}: PreviewImagensProps) {
  const rotaApi = import.meta.env.VITE_API;
  const [imagemSelecionada, setImagemSelecionada] =
    React.useState<ImagemPreview | null>(null);

  if (imagens.length === 0) return null;

  return (
    <div
      className="p-2 h-[320px] w-full overflow-y-scroll"
      style={{
        scrollbarColor: "var(--corPrincipal) var(--base-color)",
        scrollbarWidth: "thin",
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
        {imagens.map((file, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden border border-[var(--corPrincipal)] bg-white p-1 shadow-sm"
            onClick={() => setImagemSelecionada(file as ImagemPreview)}
          >
            <ButtonDelete
              index={index}
              file={file}
              setImageToUpload={setImagens}
              endpoint={endpoint}
            />
            {/* Imagem */}
            <Imagem file={file} index={index} endpoint={`${rotaApi}/upload`} />
          </div>
        ))}
      </div>

      {imagemSelecionada && (
        <VerImagem
          file={imagemSelecionada}
          endpoint={`${rotaApi}/upload`}
          isOpen={true}
          onClose={() => setImagemSelecionada(null)}
        />
      )}
    </div>
  );
}

export default PreviewImagens;

interface ButtonDeleteProps {
  index: number;
  file: ImagemPreview;
  setImageToUpload: React.Dispatch<React.SetStateAction<ImagemPreview[]>>;
  endpoint?: string;
}

export function ButtonDelete({
  index,
  file,
  setImageToUpload,
  endpoint,
}: ButtonDeleteProps) {
  function isImagemApi(file: ImagemPreview): file is ImagemApi {
    return !(file instanceof File);
  }

  function removerImagemUpload() {
    setImageToUpload((prev) => prev.filter((_, i) => i !== index));
  }

  async function removerImagemApi(file: ImagemPreview, endpoint?: string) {
    if (!isImagemApi(file)) return;
    if (!endpoint) return;

    try {
      setImageToUpload((prev) => prev.filter((_, i) => i !== index));
      // aqui precisa deletar do backend
      // precisa ajustar o upload inteiro
      await requisicaoDelete(`/upload/${file.id}`);
    } catch (error) {
      console.error("Erro ao remover imagem", error);
      Alerta("toast", "error", "Erro ao remover imagem");
    }
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();

        Confirm({
          text: "Tem certeza que deseja remover essa imagem?",
          onConfirm: () => {
            if (endpoint) {
              removerImagemApi(file, endpoint);
            } else {
              removerImagemUpload();
            }
          },
          onCancel: () => {},
        });
      }}
      className=" cursor-pointer
                absolute top-2 right-2 z-10
                bg-[var(--corPrincipal)]
                hover:bg-[var(--corPrincipal)]/80
                text-white p-2 rounded-full
                shadow-md
                opacity-0 group-hover:opacity-100
                transition-all duration-200
              "
      title="Remover imagem"
    >
      <FaTrashAlt size={14} />
    </button>
  );
}

interface ImagemProps {
  file: ImagemPreview;
  index: number;
  endpoint?: string;
}

export function Imagem({ file, index, endpoint }: ImagemProps) {
  const src =
    file instanceof File
      ? URL.createObjectURL(file)
      : `${endpoint}/${file.arquivo}`;

  return (
    <img
      src={src}
      alt={`Imagem ${index + 1}`}
      className="
        w-full h-32 object-cover
        transition-transform duration-300
        group-hover:scale-105
      "
    />
  );
}
