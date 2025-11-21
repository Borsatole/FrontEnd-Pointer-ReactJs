import { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Cliente, Endereco } from "@components/tipos";
import { SelectModificado } from "@src/components/comum/select";
import { getIcon } from "../icons";
import Enderecos from "./enderecos/Enderecos";
import { LetraMaiuscula } from "@src/services/funcoes-globais";
import { Update } from "@src/services/crud2";

interface ModalEditarProdutoProps {
  selectedProduto: Cliente | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Cliente | null>>;
  registros: Cliente[];
  setRegistros: React.Dispatch<React.SetStateAction<Cliente[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEditarRegistro({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalEditarProdutoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);

  

  console.log(enderecos);

  // Refs para os campos do formulário
  const refs = {
    nome: useRef<HTMLInputElement>(null),
    razao_social: useRef<HTMLInputElement>(null),
    enderecos: enderecos,
    email: useRef<HTMLInputElement>(null),
    telefone: useRef<HTMLInputElement>(null),
    celular: useRef<HTMLInputElement>(null),
    observacao: useRef<HTMLTextAreaElement>(null),

    
  };

  const registro = registros.find((p) => p.id === selectedProduto?.id);

  console.log(registro);

  // Popula os campos com os dados do produto
  const preencherCampos = () => {
    if (!registro || isLoadingInit) return;

    // Para input normal
    if (refs.nome.current) {
      refs.nome.current.value = registro.nome || "";
    }

    if (refs.razao_social.current) {
      refs.razao_social.current.value = registro.razao_social || "";
    }

    

    if (refs.email.current) {
      refs.email.current.value = registro.email || "";
    }

    if (refs.telefone.current) {
      refs.telefone.current.value = registro.telefone || "";
    }

    if (refs.celular.current) {
      refs.celular.current.value = registro.celular || "";
    }

    if (registro.enderecos) {
      setEnderecos(registro.enderecos);
    }

    if (refs.observacao.current) {
      refs.observacao.current.value = registro.observacao || "";
    }

    
  };

  useEffect(preencherCampos, [registro, isLoadingInit]);

  const coletarDadosFormulario = (): Cliente => ({
    nome: refs.nome.current?.value || "",
    razao_social: refs.razao_social.current?.value || "",
    // enderecos: enderecos,
    email: refs.email.current?.value || "",
    telefone: refs.telefone.current?.value || "",
    celular: refs.celular.current?.value || "",

  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduto?.id) return;

    setIsLoading(true);
    try {
      const data = coletarDadosFormulario();

      const payload = {
      nome: LetraMaiuscula(data.nome),
      razao_social: LetraMaiuscula(data.razao_social),
      email: LetraMaiuscula(data.email),
      telefone: data.telefone,
      celular: data.celular,
      observacao: LetraMaiuscula(refs.observacao.current?.value || ""),
    };

      Update<any>({
        payload,
        registros,
        setRegistros,
        endpoint: `/clientes/${selectedProduto.id}`,
      })
      setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedProduto(null);

  // Early returns para casos especiais
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
    <div className="flex flex-col p-4 border-b border-[var(--base-color)] mb-4">
      <div className="flex items-center gap-4">
        {/* Ícone simulando foto do usuário */}
        <div className="w-20 h-20 rounded-lg bg-[var(--base-color)] flex items-center justify-center text-[var(--corPrincipal)] shadow-inner">
          {getIcon("clientes", 48, "text-[var(--corPrincipal)]")}
        </div>

        {/* Informações e título */}
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-color)]">{`Cadastro de Cliente - ${registro?.id || "-"}`}</h2>
          <p className="text-sm text-[var(--text-color)]/70">
            Insira ou atualize os dados do cliente abaixo
          </p>
        </div>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-6">
      

      {/* Campo Nome */}
      <FormGroup label="Nome" id="nome">
        <Input
          id="nome"
          type="text"
          className='uppercase'
          inputRef={refs.nome}
          required
          disabled={isLoading}
          placeholder="Ex: João da Silva"
        />
      </FormGroup>

      {/* Campo E-mail */}
      <FormGroup label="E-mail" id="email">
        <Input
          id="email"
          type="email"
          className='uppercase'
          inputRef={refs.email}
          disabled={isLoading}
          placeholder="cliente@email.com"
        />
      </FormGroup>

      {/* Campo Telefone */}
      <FormGroup label="Telefone" id="telefone">
        <Input
          id="telefone"
          type="text"
          className='uppercase'
          inputRef={refs.telefone}
          disabled={isLoading}
          placeholder="(00) 0000-0000"
        />
      </FormGroup>

      {/* Campo Celular */}
      <FormGroup label="Celular" id="celular">
        <Input
          id="celular"
          type="text"
          inputRef={refs.celular}
          disabled={isLoading}
          placeholder="(00) 00000-0000"
        />
      </FormGroup>

      {/* Endereços */}

      <Enderecos
        ClassName="md:col-span-2"

        // enderecos do modal editarRegistro.tsx
        enderecos={enderecos} 
        setEnderecos={setEnderecos}
        
        // Comandos da Tabela.tsx
        selectedProduto={selectedProduto}
        setSelectedProduto={setSelectedProduto}
        registros={registros}
        setRegistros={setRegistros}
        setLoadingSpiner={setLoadingSpiner}
        setRelistar={setRelistar}

      />
      

      {/* Campo Observação */}
      <FormGroup label="Observação" id="observacao" className="md:col-span-2">
        <TextArea
          id="observacao"
          className="font-bold uppercase text-[var(--text-color)]"
          inputRef={refs.observacao}
          disabled={isLoading}
          placeholder="Observação"
        />
      </FormGroup>

      

      {/* Botão Salvar */}
      <div className="md:col-span-2 flex justify-end">
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          wsize="w-full md:w-auto mt-4"
        >
          Salvar Cliente
        </Button>
      </div>
    </form>
    </Modal>

  );
}

export default ModalEditarRegistro;