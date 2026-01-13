import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import Alerta, { Confirm } from "../comum/alertas";
import Modal from "@components/modal/Modal";
import VerImagem from "./VerImagem";

interface PreviewImagensProps {
  endpoint?: string;
  imagens: File[];
  setImagens: React.Dispatch<React.SetStateAction<File[]>>;
}

function PreviewImagens({
  endpoint,
  imagens,
  setImagens,
}: PreviewImagensProps) {
  const [imagemSelecionada, setImagemSelecionada] = React.useState<File | null>(
    null
  );
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
            onClick={() => setImagemSelecionada(file)}
          >
            <ButtonDelete index={index} setImageToUpload={setImagens} />
            {/* Imagem */}
            <Imagem file={file} index={index} />
          </div>
        ))}
      </div>

      {imagemSelecionada && (
        <VerImagem
          file={imagemSelecionada}
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
  setImageToUpload: React.Dispatch<React.SetStateAction<File[]>>;
}

export function ButtonDelete({ index, setImageToUpload }: ButtonDeleteProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();

        Confirm({
          text: "Tem certeza que deseja remover essa imagem?",
          onConfirm: () => {
            setImageToUpload((prev) => prev.filter((_, i) => i !== index));
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
  file: File;
  index: number;
}

export function Imagem({ file, index }: ImagemProps) {
  return (
    <img
      src={URL.createObjectURL(file)}
      alt={`Imagem ${index + 1}`}
      className="
        w-full h-32 object-cover
        transition-transform duration-300
        group-hover:scale-105
      "
    />
  );
}
