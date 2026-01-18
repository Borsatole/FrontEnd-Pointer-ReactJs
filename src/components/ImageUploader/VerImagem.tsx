import React from "react";
import Modal from "@components/modal/Modal";
import { ImagemPreview } from "@src/components/tipos";

interface VerImagemProps {
  file: ImagemPreview;
  isOpen: boolean;
  onClose: () => void;
  endpoint?: string;
}

function VerImagem({ file, isOpen, onClose, endpoint }: VerImagemProps) {
  if (!file) return null;

  const src =
    file instanceof File
      ? URL.createObjectURL(file)
      : `${endpoint}/${file.arquivo}`;

  return (
    <Modal
      IsOpen={isOpen}
      onClose={onClose}
      className="!w-screen !h-screen !max-w-none !max-h-none p-0"
    >
      <div className="w-full h-full flex items-center justify-center ">
        <img
          src={src}
          alt="Imagem"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </Modal>
  );
}

export default VerImagem;
