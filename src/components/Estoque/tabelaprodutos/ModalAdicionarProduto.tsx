import { useState, useEffect, useRef } from "react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Produto } from "@components/tipos";
import { requisicaoGet } from "@services/requisicoes";
import { SelectModificado } from "@components/comum/select";
import { Spinner } from "flowbite-react";
import { adicionarProduto } from "./Functions";
import { Categoria } from "@src/components/tipos";
import { Link } from "react-router-dom";


interface ModalAdicionarProdutoProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalAdicionarProduto({
  AbrirModalNovoRegistro,
  setAbrirModalNovoRegistro,
  produtos,
  setProdutos,
  setRelistar,
  setLoadingSpiner
}: ModalAdicionarProdutoProps) {
  
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);

  const formRefs = {
    nome: useRef<HTMLInputElement>(null),
    quantidade: useRef<HTMLInputElement>(null),
    categoria: useRef<HTMLSelectElement>(null),
  };

  // Busca categorias
  useEffect(() => {
    if (!AbrirModalNovoRegistro) return; // Só busca quando o modal abrir
    setIsLoadingInit(true);
    requisicaoGet("/Estoque/categoria/Read.php")
      .then((response) => {
        if (response?.data.success) {
          setCategorias(response.data.Registros);
        }
      })
      .finally(() => setIsLoadingInit(false));
  }, [AbrirModalNovoRegistro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: Omit<Produto, "id"> = {
      nome: formRefs.nome.current?.value || "",
      quantidade: Number(formRefs.quantidade.current?.value) || 0,
      categoria: formRefs.categoria.current?.value || "",
    };

    if (!data.nome || !data.quantidade || !data.categoria) return;

    setIsLoading(true);
    try {
      await adicionarProduto({
        data,
        produtos,
        setProdutos,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!AbrirModalNovoRegistro) return null;

  if (isLoadingInit) {
    return (
      <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">
      <form onSubmit={handleSubmit}>
        <FormGroup label="Nome do Produto" id="nome">
          <Input inputRef={formRefs.nome} id="nome" type="text" required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Quantidade" id="quantidade">

          <Input
            inputRef={formRefs.quantidade}
            id="quantidade"
            type="number"
            min="0"
            required
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup label="Categoria" id="categoria">
          <SelectModificado
            id="categoria"
            ref={formRefs.categoria}
            defaultValue={categorias[0]?.nome || ""}

            style={{
              backgroundColor: "var(--base-variant)",
              color: "var(--text-color)",
              outlineColor: "var(--corPrincipal)",
            }}
            required
            disabled={isLoading}
          >
            
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nome}>
                {categoria.nome}
              </option>
            ))}
          </SelectModificado>
        </FormGroup>

        <div className="flex gap-2">
          <Button loading={isLoading} wsize="w-full mt-4" type="submit" disabled={isLoading}>
            Adicionar
          </Button>
          <Link to={"/estoque-categorias"}>
          <Button loading={isLoading} wsize="w-full mt-4" type="submit" disabled={isLoading}>
            Criar Categoria
          </Button>
          </Link>
        </div>
      </form>
    </Modal>
  );
}

export default ModalAdicionarProduto;