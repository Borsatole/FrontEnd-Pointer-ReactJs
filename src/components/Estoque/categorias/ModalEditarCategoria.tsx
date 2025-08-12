import Modal from "../../../components/modal/Modal";
import { Button } from "../../../components/comum/button";
import { FormGroup } from "../../../components/comum/FormGroup";
import { Input } from "../../../components/comum/input";
import { Categoria } from "../../../components/tipos";
import { useRef } from "react";
import { editarCategoria } from "./Functions";

interface ModalEditarCategoriaProps {
  IsOpen: boolean;
  onClose: () => void;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategoria: Categoria;
  setSelectedCategoria: React.Dispatch<React.SetStateAction<Categoria | null>>;
}

function ModalEditarCategoria({
  IsOpen,
  onClose,
  setRelistar,
  setSelectedCategoria,
  selectedCategoria,
}: ModalEditarCategoriaProps) {
  const nomeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Categoria = {
      id: selectedCategoria.id,
      nome: nomeRef.current?.value.trim() || "",
    };

    if (!data.nome) {
      alert("O nome da categoria não pode estar vazio.");
      return;
    }

    editarCategoria({ data, setRelistar, setSelectedCategoria });
  };

  return (
    <Modal IsOpen={IsOpen} onClose={onClose} className="min-h-auto">
      <div className="flex flex-col mt-3">
        <form onSubmit={handleSubmit}>
          <FormGroup label="ID da Categoria" id="categoria-id">
            <Input
              id="categoria-id"
              type="text"
              value={String(selectedCategoria.id)}
              readOnly
            />
          </FormGroup>

          <FormGroup label="Nome da Categoria" id="categoria-nome">
            <Input
              inputRef={nomeRef}
              id="categoria-nome"
              type="text"
              placeholder="Digite o nome da categoria"
              defaultValue={selectedCategoria.nome}
              autoFocus
            />
          </FormGroup>

          <div className="flex gap-2">
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalEditarCategoria;
