import { useState, useEffect, useRef } from "react";
import { Spinner, TabItem, Tabs } from "flowbite-react";
import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { informacoes, Registros } from "./tipos";
import { editarRegistro } from "@src/services/Crud";
import { MdDashboard } from "react-icons/md";
import { RiHotelFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";

interface ModalEditarProdutoProps {
  selectedProduto: Registros | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Registros | null>>;
  registros: Registros[];
  setRegistros: React.Dispatch<React.SetStateAction<Registros[]>>;
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
  const [isLoadingInit, setIsLoadingInit] = useState(false);

  const fecharModal = () => setSelectedProduto(null);

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
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-[80vh]">
      <div className="overflow-x-auto">
        <Tabs aria-label="Full width tabs" variant="fullWidth">

          <TabItem active title="Dashboard" icon={MdDashboard}>
            Conteúdo do Dashboard
          </TabItem>

          <TabItem title="Notificações" icon={IoIosNotifications}>
            Conteúdo de Contatos
          </TabItem>

          <TabItem title="Informações" icon={RiHotelFill}>
            <Informacoes
              selectedProduto={selectedProduto}
              setSelectedProduto={setSelectedProduto}
              registros={registros}
              setRegistros={setRegistros}
              setRelistar={setRelistar}
              setLoadingSpiner={setLoadingSpiner}
            />
          </TabItem>
          
        </Tabs>
      </div>
    </Modal>
  );
}

export default ModalEditarRegistro;

// =======================
// Formulário de Edição
// =======================

interface InformacoesProps {
  selectedProduto: Registros | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<Registros | null>>;
  registros: Registros[];
  setRegistros: React.Dispatch<React.SetStateAction<Registros[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Informacoes({
  selectedProduto,
  setSelectedProduto,
  registros,
  setRegistros,
  setRelistar,
  setLoadingSpiner,
}: InformacoesProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Refs dos campos
  const refs = {
    nome: useRef<HTMLInputElement>(null),
    setor: useRef<HTMLSelectElement>(null),
    rua: useRef<HTMLInputElement>(null),
  };

  // Busca registro atual
  const registro = registros.find((p) => p.id === selectedProduto?.id);

  // Preenche os campos ao abrir
  useEffect(() => {
    if (!registro) return;
    if (refs.nome.current) {
      refs.nome.current.value = registro.nome || "";
    }
    if (refs.rua.current) {
      // aqui só funciona se "registro" tiver a propriedade "rua"
      // senão você deve mudar "registro" para ser do tipo "informacoes"
      (refs.rua.current as HTMLInputElement).value = (registro as any).rua || "";
    }
  }, [registro]);

  // Coleta dados do form
  const coletarDadosFormulario = (): informacoes => ({
    id: Number(selectedProduto!.id),
    nome: refs.nome.current?.value || "",
    rua: refs.rua.current?.value || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const produtoEditado = coletarDadosFormulario();
      console.log(produtoEditado);

      // await editarRegistro<informacoes>({
      //   data: produtoEditado,
      //   setRelistar,
      //   setSelected: setSelectedProduto,
      //   setLoadingSpiner,
      //   registros,
      //   setRegistros,
      //   endpoint: "/Estoque/categoria/Update.php",
      // });
      // setSelectedProduto(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      {/* Campo Nome / Condomínio */}
      <FormGroup label="Condomínio" id="nome">
        <Input
          id="nome"
          type="text"
          inputRef={refs.nome}
          required
          disabled={isLoading}
        />
      </FormGroup>

      {/* Campo Rua */}
      <FormGroup label="Rua" id="rua">
        <Input
          id="rua"
          type="text"
          inputRef={refs.rua}
          disabled={isLoading}
        />
      </FormGroup>

      <Button
        type="submit"
        loading={isLoading}
        disabled={isLoading}
        wsize="w-full mt-6"
      >
        Salvar Alterações
      </Button>
    </form>
  );
}

