import { useState, useEffect } from "react";
import { FooterDivider, Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { SelectModificado } from "@src/components/comum/select";
import { getIcon } from "../icons";
import { LetraMaiuscula } from "@services/funcoes-globais";
import { Create } from "@src/services/crud2";
import { useVisitas } from "@src/context/VisitasContext";

function ModalAdicionarRegistro() {
  const {
    registros,
    setRegistros,
    setRelistar,
    setLoadingSpiner,
    selectedRegistro,
    setSelectedRegistro,
    abrirModalNovoRegistro,
    setAbrirModalNovoRegistro,
  } = useVisitas();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  // estados do cliente
  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [observacao, setObservacao] = useState("");

  // coleta dos dados para envio
  const coletarDadosFormulario = (): any => ({
    nome: LetraMaiuscula(nome),
    razao_social: LetraMaiuscula(razaoSocial),
    email: LetraMaiuscula(email),
    telefone,
    celular,
    observacao: LetraMaiuscula(observacao),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = coletarDadosFormulario();

      Create<any>({
        payload: data,
        endpoint: "/clientes",
        // registros,
        // setRegistros,
        antesDeExecutar: () => {
          setLoadingSpiner(true);
        },
        depoisDeExecutar: () => {
          setAbrirModalNovoRegistro(false);
          setLoadingSpiner(false);
          setRelistar(true);
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setAbrirModalNovoRegistro(false);

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
          <div className="w-20 h-20 rounded-lg bg-[var(--base-color)] flex items-center justify-center text-[var(--corPrincipal)] shadow-inner">
            {getIcon("clientes", 48, "text-[var(--corPrincipal)]")}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[var(--text-color)]">
              Cadastro de Cliente
            </h2>
            <p className="text-sm text-[var(--text-color)]/70">
              Insira ou atualize os dados do cliente abaixo
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-6"
      >
        {/* ===================== DADOS DO CLIENTE ===================== */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">
            Dados do Cliente
          </h3>
          <div className="border-t border-[var(--base-color)] mb-4" />
        </div>

        <FormGroup label="Nome" id="nome">
          <Input
            id="nome"
            type="text"
            className="uppercase"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Ex: João da Silva"
          />
        </FormGroup>

        <FormGroup label="Razão Social" id="razao_social">
          <Input
            id="razao_social"
            type="text"
            className="uppercase"
            value={razaoSocial}
            onChange={(e) => setRazaoSocial(e.target.value)}
            disabled={isLoading}
            placeholder="Razão social"
          />
        </FormGroup>

        <FormGroup label="E-mail" id="email">
          <Input
            id="email"
            type="email"
            value={email}
            className="uppercase"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            placeholder="cliente@email.com"
          />
        </FormGroup>

        <FormGroup label="Telefone" id="telefone">
          <Input
            id="telefone"
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            disabled={isLoading}
            placeholder="(00) 0000-0000"
          />
        </FormGroup>

        <FormGroup label="Celular" id="celular">
          <Input
            id="celular"
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            disabled={isLoading}
            placeholder="(00) 00000-0000"
          />
        </FormGroup>

        {/* ===================== ENDEREÇO ===================== */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-[var(--text-color)] mb-2">
            Endereço
          </h3>
          <div className="border-t border-[var(--base-color)] mb-4" />
        </div>

        <FormGroup label="CEP" id="cep">
          <Input
            id="cep"
            className="uppercase"
            type="text"
            // value={endereco.cep}
            onChange={(e) => console.log(e.target.value)}
            disabled={isLoading}
            placeholder="Digite o CEP para buscar o endereço"
          />
        </FormGroup>

        <FormGroup label="Bairro" id="bairro">
          <Input
            id="bairro"
            className="uppercase"
            type="text"
            disabled={isLoading}
            placeholder="Bairro"
          />
        </FormGroup>

        <FormGroup label="Logradouro" id="logradouro" className="md:col-span-2">
          <Input
            id="logradouro"
            className="uppercase"
            type="text"
            disabled={isLoading}
            placeholder="Logradouro"
          />
        </FormGroup>

        <FormGroup label="Complemento" id="complemento">
          <Input
            id="complemento"
            className="uppercase"
            type="text"
            disabled={isLoading}
            placeholder="Complemento"
          />
        </FormGroup>

        <FormGroup label="Número" id="numero">
          <Input
            id="numero"
            className="uppercase"
            type="text"
            disabled={isLoading}
            placeholder="Número"
          />
        </FormGroup>

        <FormGroup label="Cidade" id="cidade">
          <Input
            id="cidade"
            className="uppercase"
            type="text"
            disabled={isLoading}
            placeholder="Cidade"
          />
        </FormGroup>

        <FormGroup label="Observação" id="observacao" className="md:col-span-2">
          <TextArea
            id="observacao"
            className="font-bold uppercase text-[var(--text-color)]"
            value={observacao}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setObservacao(e.target.value)
            }
            disabled={isLoading}
            placeholder="Observação"
          />
        </FormGroup>

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

export default ModalAdicionarRegistro;
