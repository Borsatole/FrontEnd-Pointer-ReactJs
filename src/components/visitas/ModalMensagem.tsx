import React from 'react'
import Modal from '@src/components/modal/Modal';
import { TextArea } from '@src/components/comum/input';
import { Button } from '../comum/button';

function ModalMensagem({
  abrirModalMensagem,
  setAbrirModalMensagem,
  mensagemSelecionada
}: {
  abrirModalMensagem: boolean;
  setAbrirModalMensagem: React.Dispatch<React.SetStateAction<boolean>>;
  mensagemSelecionada: string | null;
}) {
  return (
    <Modal
      IsOpen={abrirModalMensagem}
      onClose={() => setAbrirModalMensagem(false)}
      className="flex flex-col w-full max-w-3xl"
    >
      <div className="flex flex-col flex-1 p-4 gap-3">
        <TextArea
          id="mensagem"
          className="flex-1 text-center resize-none bg-[var(--base-variant)]"
          value={mensagemSelecionada || "Nenhuma mensagem"}

        
          readOnly
        />
        

        <Button
        onClick={() => setAbrirModalMensagem(false)}
        className="mb-3"
        >
            Fechar Mensagem
        </Button>
      </div>
      
    </Modal>
  );
}

export default ModalMensagem