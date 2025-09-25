import { useState, useRef, useEffect } from "react";
import Modal from "@components/modal/Modal";
import { Input, TextArea } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { Registros } from "./tipos";
import { SelectModificado } from "@src/components/comum/select";

import { adicionarRegistro } from "@src/services/Crud";
import { requisicaoGet } from "@src/services/requisicoes";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

interface ModalAdicionarNotificacaoProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  registros: Registros[];
  setRegistros: React.Dispatch<React.SetStateAction<Registros[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Condominio {
  id: number;
  nome: string;
}

function ModalAdicionarNotificacao({
  AbrirModalNovoRegistro,
  setAbrirModalNovoRegistro,
  registros,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalAdicionarNotificacaoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(true);
  const [condominios, setCondominios] = useState<Condominio[]>([]);

  const formRefs = {
    condominio: useRef<HTMLSelectElement>(null),
    titulo: useRef<HTMLInputElement>(null),
    mensagem: useRef<HTMLTextAreaElement>(null),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: Registros = {
      id_condominio: Number(formRefs.condominio.current?.value) || 0,
      titulo: formRefs.titulo.current?.value || "",
      mensagem: formRefs.mensagem.current?.value || "",
    };
    
    if (!data.titulo || !data.mensagem) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    try {
      await adicionarRegistro<Registros>({
        data,
        registros,
        setRegistros,
        setRelistar,
        setAbrirModalNovoRegistro,
        setLoadingSpiner,
        endpoint: "/condominios/notificacoes/Create.php"
      });
      console.log(data);
    } finally {
      setIsLoading(false);
    }
  };

  // Busca condominios
  useEffect(() => {
    if (!AbrirModalNovoRegistro) return; // Só busca quando o modal abrir
    setIsLoadingInit(true);
    requisicaoGet("/condominios/Read.php")
      .then((response) => {
        if (response?.data.success) {
          console.log(response.data.Registros);
          setCondominios(response.data.Registros);
        }
      })
      .finally(() => setIsLoadingInit(false));
  }, [AbrirModalNovoRegistro]);

  const fecharModal = () => setAbrirModalNovoRegistro(false);

  if (!AbrirModalNovoRegistro) return null;

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
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">
      <h2 className="text-xl font-semibold mb-4">Novo Chamado</h2>
      
      <form onSubmit={handleSubmit}>
        <FormGroup label="Condomínio" id="condominio">
          <SelectModificado
            id="condominio"
            ref={formRefs.condominio}
            defaultValue=""
            style={{
              backgroundColor: "var(--base-variant)",
              color: "var(--text-color)",
              outlineColor: "var(--corPrincipal)",
            }}
            required
            disabled={isLoading}
          >
            <option value="">Selecione um condomínio</option>
            {condominios.map((condominio) => (
              <option key={condominio.id} value={condominio.id}>
  {condominio.nome}
</option>
            ))}
          </SelectModificado>
        </FormGroup>

        <FormGroup label="Título" id="titulo">
          <Input 
            inputRef={formRefs.titulo} 
            id="titulo" 
            type="text" 
            required 
            disabled={isLoading}
            placeholder="Digite o título da notificação"
          />
        </FormGroup>

        <FormGroup label="Mensagem" id="mensagem">

          <TextArea
            inputRef={formRefs.mensagem}
            id="mensagem"
            required
            disabled={isLoading}
            placeholder="Digite a mensagem da notificação"
          />
        </FormGroup>

        

       

        <div className="flex gap-2">
          <Button 
            loading={isLoading} 
            wsize="w-full mt-4" 
            type="submit" 
            disabled={isLoading}
          >
            Abrir Chamado
          </Button>
          
        </div>
      </form>
    </Modal>
  );
}

export default ModalAdicionarNotificacao;