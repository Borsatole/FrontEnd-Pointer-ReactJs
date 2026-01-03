import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { getIcon } from "../icons";
import { LetraMaiuscula } from "@src/services/funcoes-globais";
import { Update } from "@src/services/crud2";
import { useClientes } from "@src/context/ClientesContext";
import Enderecos2 from "./enderecos/Enderecos2";

export default function ModalEditarRegistro2() {
  const {
    registros,
    setRegistros,
    setRelistar,
    setLoadingSpiner,
    selectedCliente,
    setSelectedCliente,
  } = useClientes();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);

  // Campos controlados
  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [observacao, setObservacao] = useState("");

  const [enderecos, setEnderecos] = useState<any[]>([]);

  const registro = registros.find((p) => p.id === selectedCliente?.id);

  // Preenche os campos quando abrir o modal
  useEffect(() => {
    if (!registro) return;

    setNome(registro.nome || "");
    setRazaoSocial(registro.razao_social || "");
    setEmail(registro.email || "");
    setTelefone(registro.telefone || "");
    setCelular(registro.celular || "");
    setObservacao(registro.observacao || "");
    setEnderecos(registro.enderecos || []);

    setIsLoadingInit(false);
  }, [registro]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCliente?.id) return;

    setIsLoading(true);

    try {
      const payload = {
        nome: LetraMaiuscula(nome),
        razao_social: LetraMaiuscula(razaoSocial),
        email: LetraMaiuscula(email),
        telefone,
        celular,
        observacao: LetraMaiuscula(observacao),
      };

      Update<any>({
        payload,
        registros,
        setRegistros,
        endpoint: `/clientes/${selectedCliente.id}`,
      });

      setSelectedCliente(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fecharModal = () => setSelectedCliente(null);

  if (!selectedCliente) return null;

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
              {`Cadastro de Cliente - ${registro?.id || "-"}`}
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
        <FormGroup label="Nome" id="nome">
          <Input
            id="nome"
            type="text"
            className="uppercase"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={isLoading}
            required
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
          />
        </FormGroup>

        <FormGroup label="E-mail" id="email">
          <Input
            id="email"
            type="email"
            className="uppercase"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup label="Telefone" id="telefone">
          <Input
            id="telefone"
            type="text"
            className="uppercase"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup label="Celular" id="celular">
          <Input
            id="celular"
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            disabled={isLoading}
          />
        </FormGroup>

        <Enderecos2
          ClassName="md:col-span-2"
          enderecos={enderecos}
          setEnderecos={setEnderecos}
        />

        <FormGroup label="Observação" id="observacao" className="md:col-span-2">
          <TextArea
            id="observacao"
            className="font-bold uppercase text-[var(--text-color)]"
            value={observacao}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setObservacao(e.target.value)
            }
            disabled={isLoading}
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
