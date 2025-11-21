import { useState, useRef, useEffect } from "react";
import { getIcon } from "@src/components/icons";

import Modal from "@components/modal/Modal";
import { Input } from "@components/comum/input";
import { FormGroup } from "@components/comum/FormGroup";
import { Button } from "@components/comum/button";
import { SelectModificado } from "@src/components/comum/select";
import { requisicaoGet } from "@src/services/requisicoes";
import { Cliente, Endereco, GrupoEstoque, ItemEstoque } from "@src/components/tipos";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { LuUserRoundSearch } from "react-icons/lu";
import ProcurarClientes from "./ProcuraClientes";
import BotaoSeletor from "../comum/buttonSelected";
import { Create } from "@src/services/crud2";

interface ModalAdicionarContaProps {
  AbrirModalNovoRegistro: boolean;
  setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>;
  registros: GrupoEstoque[];
  selectedProduto: ItemEstoque | null;
  setSelectedProduto: React.Dispatch<React.SetStateAction<ItemEstoque | null>>;
  setRegistros: React.Dispatch<React.SetStateAction<GrupoEstoque[]>>;
  setRelistar: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalAdicionarRegistro({
  AbrirModalNovoRegistro,
  setAbrirModalNovoRegistro,
  registros,
  selectedProduto,
  setSelectedProduto,
  setRegistros,
  setLoadingSpiner,
  setRelistar,
}: ModalAdicionarContaProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingInit, setIsLoadingInit] = useState(true);
    const [categorias, setCategorias] = useState<any[]>([]);

    // dados
    const[dadosCliente, setDadosCliente] = useState<Cliente | null>(null);[]>([]);

    const[cliente_id, setCliente_id] = useState<number | null>(null);
    const[locacao_item_id, setLocacao_item_id] = useState<number>();
    const[endereco_id, setEndereco_id] = useState<number | null>(null);
    const[data_inicio, setData_inicio] = useState<string>("");
    const[data_fim, setData_fim] = useState<string>("");
    const[preco_total, setPreco_total] = useState<Number>(0);
    const[forma_pagamento, setForma_pagamento] = useState<string>("");

    const [enderecos, setEnderecos] = useState<Endereco[] | []>([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState<Endereco | null>(null);
  

    

    // Modais
    const [abrirModalProcuraClientes, setabrirModalProcuraClientes] = useState(false);
    

    useEffect(() => {
      setLocacao_item_id(selectedProduto?.id);
    }, [selectedProduto]);

    useEffect(() => {

      if(!dadosCliente) return
      setDadosCliente(dadosCliente);
      setCliente_id(Number(dadosCliente?.id));
      setEnderecos(dadosCliente?.enderecos || []);


      setData_inicio(new Date().toISOString().split("T")[0]);
      setData_fim(new Date('2025-11-31').toISOString().split("T")[0]);
      setPreco_total(150.00);
      setForma_pagamento("dinheiro");

      // console.log(dadosCliente);
      // console.log(selectedProduto);
      // console.log(enderecos);
    }, [dadosCliente]);

    const handleEnderecoToggle = (endereco: Endereco) => {
      if (endereco.id === enderecoSelecionado?.id) {
        setEndereco_id(null);
        setEnderecoSelecionado(null);
      } else {
        setEndereco_id(Number(endereco.id));
        setEnderecoSelecionado(endereco);
      }
    };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const payload = {
      cliente_id,
      locacao_item_id,
      endereco_id,
      data_inicio,
      data_fim,
      preco_total,
      forma_pagamento
    };
  
    
    console.log(payload);
    setIsLoading(true);

    
    try {

      Create<any>({
        payload,
        endpoint: "/locacoes",
        // registros,
        // setRegistros,
        antesDeExecutar : () => {
          setLoadingSpiner(true);
        },
        depoisDeExecutar : () => {
          setLoadingSpiner(false);
          setAbrirModalNovoRegistro(false);
          setRelistar(true);
        },

        
      });
    }
    finally {
      setIsLoading(false);
    }
  };

  if (!AbrirModalNovoRegistro) return null;

  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">

      <form onSubmit={handleSubmit} className="space-y-4">
      <FormGroup label="Cliente" id="cliente">
        {dadosCliente ? (
          <div className="bg-[var(--base-color)] rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{dadosCliente.nome}</h3>
                  {dadosCliente.razao_social && (
                    <p className="text-sm">{dadosCliente.razao_social}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {dadosCliente.telefone && (
                    <div>
                      <span className="text-gray-500 font-medium">Telefone:</span>
                      <p className="text-gray-700">{dadosCliente.telefone}</p>
                    </div>
                  )}
                  {dadosCliente.celular && (
                    <div>
                      <span className="text-gray-500 font-medium">Celular:</span>
                      <p className="text-gray-700">{dadosCliente.celular}</p>
                    </div>
                  )}
                  {dadosCliente.email && (
                    <div className="col-span-2">
                      <span className="text-gray-500 font-medium">Email:</span>
                      <p className="text-gray-700">{dadosCliente.email}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                type="button"
                onClick={() => setabrirModalProcuraClientes(true)}
                className="rounded-lg ml-3"
              >
                <LuUserRoundSearch size={20} />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setabrirModalProcuraClientes(true)}
            className="w-full rounded-lg border-2 border-dashed
              bg-[var(--base-variant)] hover:bg-[var(--base-color)] transition-all duration-200 py-8"
          >
            <div className="flex flex-col items-center gap-2">
              <LuUserRoundSearch size={32}/>
              <span className="font-medium">Selecionar Cliente</span>
            </div>
          </button>
        )}
      </FormGroup>

      {dadosCliente && (
        <FormGroup label="Endereço" id="endereco" >

          <ul className="flex flex-col gap-2">
            {enderecos.map((endereco) => (
              <li key={endereco.id} className="flex items-center gap-2">
                <BotaoSeletor
                  className="w-full"
                  value={(endereco.id || 0).toString()}
                  label={endereco.logradouro}
                  selectedValue={(enderecoSelecionado?.id || 0).toString()}
                  onClick={() => handleEnderecoToggle(endereco)}
                />
              </li>
            ))}
          </ul>
        </FormGroup>
      )}



        

        <div className="flex justify-between">
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          <p className="flex items-center gap-2">
            {getIcon("salvar", 20)}
            <span>Salvar Alterações</span>
          </p>
        </Button>
      </div>


      </form>


      {abrirModalProcuraClientes && (
        <ProcurarClientes
          abrirModalProcuraClientes={abrirModalProcuraClientes}
          setabrirModalProcuraClientes={setabrirModalProcuraClientes}
          setCliente_id={setCliente_id}
          setEnderecos={setEnderecos}
          setDadosCliente={setDadosCliente}
        />
      )}
    </Modal>
  );
}

export default ModalAdicionarRegistro;
