import { useState, useEffect, useRef } from "react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Produto } from "@components/tipos";
import { requisicaoGet } from "@services/requisicoes";
import { SelectModificado } from "@components/comum/select";
import { Spinner } from "flowbite-react";
import { editarProduto } from "./Functions";
import { Categoria } from "@src/components/tipos";

interface ModalEditarProdutoProps {
  selectedProduto: Produto | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Produto | null>>;
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditarProduto({
  selectedProduto,
  setSelectedProduto,
  produtos,
  setProdutos,
  setLoadingSpiner,
  setRelistar,
}: ModalEditarProdutoProps) {
  
  const produto = produtos.find((p) => p.id === selectedProduto?.id);

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
    setIsLoadingInit(true);
    requisicaoGet("/Estoque/categoria/categorias.php")
      .then((response) => {
        if (response?.data.success) {
          setCategorias(response.data.categorias);
        }
      })
      .finally(() => setIsLoadingInit(false));
  }, []);

  // Preenche campos com dados do produto
  useEffect(() => {
    if (produto && !isLoadingInit) {
      formRefs.nome.current!.value = produto.nome;
      formRefs.quantidade.current!.value = String(produto.quantidade);
      formRefs.categoria.current!.value = produto.categoria;
    }
  }, [produto, isLoadingInit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    const data: Produto = {
      id: selectedProduto.id,
      nome: formRefs.nome.current?.value || "",
      quantidade: Number(formRefs.quantidade.current?.value) || 0,
      categoria: formRefs.categoria.current?.value || "",
    };

    setIsLoading(true);
    try {
      await editarProduto
      ({ 
          data,
          produtos,
          setProdutos,
          setRelistar,
          setSelectedProduto,
          setLoadingSpiner 
      });

      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedProduto) return null;

  // Spinner de carregamento inicial
  if (isLoadingInit) {
    return (
      <Modal IsOpen={true} onClose={() => setSelectedProduto(null)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={() => setSelectedProduto(null)} className="min-h-auto">
      <form onSubmit={handleSubmit}>
        <FormGroup label="Código" id="codigo">
          <Input defaultValue={produto?.id} id="codigo" type="text" disabled />
        </FormGroup>

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
            ref={formRefs.categoria}
            defaultValue={produto?.categoria || categorias[0].nome || ""}
            style={{
              backgroundColor: "var(--base-variant)",
              color: "var(--text-color)",
              outlineColor: "var(--corPrincipal)",
            }}
            required
            disabled={isLoading}
          >
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.nome}>
                {categoria.nome}
              </option>
            ))}
          </SelectModificado>
        </FormGroup>

        <Button loading={isLoading} wsize="w-full mt-4" type="submit" disabled={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}

export default ModalEditarProduto;
