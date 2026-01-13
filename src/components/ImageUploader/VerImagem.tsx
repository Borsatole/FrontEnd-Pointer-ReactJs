import React from "react";
import Modal from "@components/modal/Modal";

interface VerImagemProps {
  file: File;
  isOpen: boolean;
  onClose: () => void;
}

function VerImagem({ file, isOpen, onClose }: VerImagemProps) {
  if (!file) return null;

  return (
    <Modal
      IsOpen={isOpen}
      onClose={onClose}
      className="!w-screen !h-screen !max-w-none !max-h-none p-0"
    >
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={URL.createObjectURL(file)}
          alt="Imagem"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </Modal>
  );
}

export default VerImagem;
