import { Button } from '@src/components/comum/button'
import { FormGroup } from '@src/components/comum/FormGroup'
import { Input } from '@src/components/comum/input'
import { getIcon } from '@src/components/icons'
import Modal from '@src/components/modal/Modal'
import { Endereco } from '@src/components/tipos'
import { useClientes } from '@src/context/ClientesContext'
import { Create } from '@src/services/crud2'
import { LetraMaiuscula } from '@src/services/funcoes-globais'
import { useEffect, useState } from 'react'

interface NovoEnderecoProps {
    // modais
    setAbrirModalNovoRegistro: React.Dispatch<React.SetStateAction<boolean>>
    AbrirModalNovoRegistro: boolean


    enderecos: Endereco[]
    setEnderecos: React.Dispatch<React.SetStateAction<Endereco[]>>
    rest ?: any
    ClassName ?: string
    
}

function NovoEndereco2({
    // controles enderecos.tsx
    AbrirModalNovoRegistro,
    setAbrirModalNovoRegistro,
    
    // controles editarRegistro.tsx 
    enderecos,
    setEnderecos,

    
    }: NovoEnderecoProps) {
        const {
                    registros, setRegistros,
                    setRelistar,
                    setLoadingSpiner,
                    selectedCliente, setSelectedCliente
                  } = useClientes();

    const [isLoading, setIsLoading] = useState(false);

    // dados
    const [cep, setCep] = useState<string>("");
    const [logradouro, setLogradouro] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        const payload = {
            "cliente_id": selectedCliente?.id,
            "cep": cep,
            "logradouro": logradouro,
            "complemento": complemento,
            "bairro": bairro,
            "numero": numero,
            "cidade": cidade,
            "estado": estado
        };

        
        try {
            Create<any>({
                payload,
                endpoint: "/enderecos",
                // registros,
                // setRegistros,
                antesDeExecutar : () => {
                    setIsLoading(true);
                    setLoadingSpiner(true);
                },
                depoisDeExecutar : () => {
                    setAbrirModalNovoRegistro(false);
                    setLoadingSpiner(false);
                    setRelistar(true);
                },
            }
        )
        }finally {
            setIsLoading(false);
        }

        
    }

    

    function limparFormulario(){
        setCep("");
        setLogradouro("");
        setComplemento("");
        setBairro("");
        setNumero("");
        setCidade("");
        setEstado("");
    }

    async function buscaCep(cep: string) {
        try {
            setIsLoading(true);
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

            if (!response.ok) {
                throw new Error("Erro ao buscar o CEP");
            }

            const data = await response.json();

            if (data.erro) {
                console.log("CEP não encontrado");
                    limparFormulario();
                return;
            }

            // preenche automaticamente os campos
            setLogradouro(LetraMaiuscula(data.logradouro || ""));
            setBairro(LetraMaiuscula(data.bairro || ""));
            setCidade(LetraMaiuscula(data.localidade || ""));
            setEstado(LetraMaiuscula(data.uf || ""));
            setComplemento(LetraMaiuscula(data.complemento || ""));

        } catch (error) {
            // console.error("Erro ao buscar o CEP:", error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        if (cep.length === 8) {
            buscaCep(cep);
        }
    }, [cep]);

    if (!AbrirModalNovoRegistro) return null;
  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalNovoRegistro(false)} className="min-h-auto">

        <form id="formModal" onSubmit={(e) => handleSubmit(e)} className="space-y-4">

            <FormGroup label="CEP" id="cep">
                <Input id="cep" type="text"
                    maxLength={8}
                    placeholder="Digite o cep para pesquisar o endereço correspondente"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Logradouro" id="logradouro">
                <Input id="logradouro" type="text"  
                    value={LetraMaiuscula(logradouro)}
                    onChange={(e) => setLogradouro(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Complemento" id="complemento">
                <Input id="complemento" type="text"  
                    value={LetraMaiuscula(complemento)}
                    onChange={(e) => setComplemento(e.target.value)}
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Bairro" id="bairro">
                <Input id="bairro" type="text"  
                    value={LetraMaiuscula(bairro)}
                    onChange={(e) => setBairro(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Numero" id="numero">
                <Input id="numero" type="text"  
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Cidade" id="cidade">
                <Input id="cidade" type="text"  
                    value={LetraMaiuscula(cidade)}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Estado" id="estado">
                <Input id="estado" type="text"  
                    value={LetraMaiuscula(estado)}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>


            <div className="flex justify-start gap-2">
                    <Button type="submit" 
                     loading={isLoading} 
                     disabled={isLoading}
                     >
                      <p className="flex items-center gap-2">
                        {getIcon("salvar", 20)}
                        <span>Salvar Alterações</span>
                      </p>
                    </Button>

                    <Button type="button" 
                    onClick={() => limparFormulario()}
                    //  loading={isLoading} 
                    //  disabled={isLoading}
                     >
                      <p className="flex items-center gap-2">
                        <span>Limpar Dados</span>
                      </p>
                    </Button>
                  </div>

        </form>

    </Modal>
  )
}

export default NovoEndereco2