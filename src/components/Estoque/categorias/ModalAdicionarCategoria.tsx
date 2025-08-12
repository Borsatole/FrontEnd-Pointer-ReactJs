import Modal from "../../../components/modal/Modal";
import { Button } from "../../../components/comum/button";
import { FormGroup } from "../../../components/comum/FormGroup";
import { Input } from "../../../components/comum/input";
import {adicionarCategoria} from "./Functions";
import { Categoria } from "components/tipos";
import { useRef } from "react";
import { Label } from "../../../components/comum/label";



interface ModalAdicionarCategoriaProps {
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setAbrirModalAdicionarCategoria: React.Dispatch<React.SetStateAction<boolean>>;
  ModalAdicionarCategoria: boolean;  
  IsOpen: boolean;
  onClose: () => void;
}

function ModalAdicionarCategoria({ IsOpen, onClose, setAbrirModalAdicionarCategoria, setRelistar }: ModalAdicionarCategoriaProps) {
  const formRefs = {
    categoria: useRef<HTMLInputElement>(null),
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // segura o submit padrão

  const data: Omit<Categoria, "id"> = {
    nome: formRefs.categoria.current?.value || "",
  };

  adicionarCategoria({ data, setRelistar, setAbrirModalAdicionarCategoria });
};

return (
  <Modal IsOpen={IsOpen} onClose={onClose} className="min-h-auto">
    <div className="flex flex-col mt-3">
      <form onSubmit={handleSubmit}>
        {/* campos do form */}
        <FormGroup label="Nome da Categoria" id="categoria">
          <Label htmlFor="categoria">Nome da Categoria</Label>
          <Input inputRef={formRefs.categoria} id="categoria" type="text" placeholder="Digite o nome da categoria" />
        </FormGroup>

        <div className="flex gap-2">
          <Button type="submit">Inserir</Button>
        </div>
      </form>
    </div>
  </Modal>
);

}


export default ModalAdicionarCategoria;
