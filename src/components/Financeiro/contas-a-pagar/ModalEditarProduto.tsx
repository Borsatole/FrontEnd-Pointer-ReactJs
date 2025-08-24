import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { ContaAPagar } from "./tipos";
import { editarProduto } from "./Functions";

interface ModalEditarProdutoProps {
  selectedProduto: ContaAPagar | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<ContaAPagar | null>>;
  registros: ContaAPagar[];
  setRegistros: React.Dispatch<React.SetStateAction<ContaAPagar[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditarProduto({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalEditarProdutoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  // refs de todos os campos
  const refs = {
    nome: useRef<HTMLInputElement>(null),
    categoria: useRef<HTMLInputElement>(null),
    descricao: useRef<HTMLInputElement>(null),
    valor: useRef<HTMLInputElement>(null),
    data_pagamento: useRef<HTMLInputElement>(null),
    data_vencimento: useRef<HTMLInputElement>(null),
    data_fim: useRef<HTMLInputElement>(null),
  };

  const registro = registros.find((p) => p.id === selectedProduto?.id);

  // função auxiliar para setar valor em inputs
  const setValue = (ref: React.RefObject<HTMLInputElement>, value: string) => {
    if (ref.current) ref.current.value = value;
  };

  // preenche os campos com os dados existentes
  const preencherCampos = () => {
    if (!registro || isLoadingInit) return;

    setValue(refs.nome, registro.nome || "");
    setValue(refs.categoria, registro.categoria || "");
    setValue(refs.descricao, registro.descricao || "");
    setValue(refs.valor, registro.valor?.toString() || "");
    setValue(refs.data_pagamento, registro.data_pagamento || "");
    setValue(refs.data_vencimento, registro.data_vencimento || "");

    setIsLoadingInit(false);
  };

  useEffect(preencherCampos, [registro, isLoadingInit]);

  // coleta os dados do formulário e transforma nos tipos corretos
  const coletarDadosFormulario = (): ContaAPagar => ({
    id: selectedProduto!.id,
    nome: refs.nome.current?.value || "",
    categoria: refs.categoria.current?.value || "",
    descricao: refs.descricao.current?.value || "",
    valor: Number(refs.valor.current?.value) || 0,
    data_pagamento: refs.data_pagamento.current?.value || "",
    data_vencimento: refs.data_vencimento.current?.value || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);
    try {
      const data = coletarDadosFormulario();
      console.log(data);
      await editarProduto({
        data,
        registros,
        setRegistros,
        setRelistar,
        setSelectedProduto,
        setLoadingSpiner,
      });
      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedProduto(null);

  // não renderiza se não houver produto
  if (!selectedProduto) return null;

  if (isLoadingInit) {
    return (
      <Modal IsOpen={true} onClose={fecharModal}>
        <div className="fixed inset-0 flex items-center justify-center">
          <Spinner size="xl" className="fill-[var(--corPrincipal)]" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Código */}
        <FormGroup label="Código" id="codigo">
          <Input
            id="codigo"
            type="text"
            defaultValue={registro?.id?.toString() || ""}
            disabled
          />
        </FormGroup>

        <FormGroup label="Nome do Produto" id="nome">
          <Input id="nome" type="text" inputRef={refs.nome} required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Categoria" id="categoria">
          <Input id="categoria" type="text" inputRef={refs.categoria} required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Descrição" id="descricao">
          <Input id="descricao" type="text" inputRef={refs.descricao} required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Valor" id="valor">
          <Input id="valor" type="number" step="0.01" min="0" inputRef={refs.valor} required disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Data de Pagamento" id="data_pagamento">
          <Input id="data_pagamento" type="date" inputRef={refs.data_pagamento} disabled={isLoading} />
        </FormGroup>

        <FormGroup label="Data de Vencimento" id="data_vencimento">
          <Input id="data_vencimento" type="date" inputRef={refs.data_vencimento} required disabled={isLoading} />
        </FormGroup>

        <Button type="submit" loading={isLoading} disabled={isLoading} wsize="w-full mt-6">
          Salvar Alterações
        </Button>
      </form>
    </Modal>
  );
}

export default ModalEditarProduto;
