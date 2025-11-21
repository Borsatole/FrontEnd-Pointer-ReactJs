import { Button } from '@src/components/comum/button'
import { FormGroup } from '@src/components/comum/FormGroup'
import { Input } from '@src/components/comum/input'
import { getIcon } from '@src/components/icons'
import Modal from '@src/components/modal/Modal'
import { Cliente, Endereco } from '@src/components/tipos'
import { adicionarRegistro, editarRegistro } from '@src/services/Crud'
import { Update } from '@src/services/crud2'
import { LetraMaiuscula } from '@src/services/funcoes-globais'
import { useEffect, useState } from 'react'

interface NovoEnderecoProps {
    // modais
    setAbrirModalEditarRegistro: React.Dispatch<React.SetStateAction<boolean>>
    abrirModalEditarRegistro: boolean
    setSelecionado : React.Dispatch<React.SetStateAction<Endereco | null>>
    selecionado ?: Endereco | null


    enderecos: Endereco[]
    setEnderecos: React.Dispatch<React.SetStateAction<Endereco[]>>
    rest ?: any
    ClassName ?: string
    
    // Comandos da Tabela.tsx
    selectedProduto: Cliente | null
    setSelectedProduto: React.Dispatch<React.SetStateAction<Cliente | null>>
    registros: Cliente[];
    setRegistros: React.Dispatch<React.SetStateAction<Cliente[]>>
    setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>;
    setRelistar: React.Dispatch<React.SetStateAction<boolean>>

}

function EditarEndereco({
    // controles enderecos.tsx
    setAbrirModalEditarRegistro,
    abrirModalEditarRegistro,
    setSelecionado,
    selecionado,
    
    // controles editarRegistro.tsx 
    enderecos,
    setEnderecos,

    // controles da Tabela.tsx
    registros, 
    setRegistros, 
    setRelistar, 
    selectedProduto, 
    setLoadingSpiner, 
    setSelectedProduto, 

    
    }: NovoEnderecoProps) {
    const [isLoading, setIsLoading] = useState(false);

    // dados
    const [cep, setCep] = useState<string>("");
    const [logradouro, setLogradouro] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");

    useEffect(() => {
        if (selecionado) {
            setCep(selecionado.cep);
            setLogradouro(selecionado.logradouro);
            setComplemento(selecionado.complemento);
            setBairro(selecionado.bairro);
            setNumero(selecionado.numero);
            setCidade(selecionado.cidade);
            setEstado(selecionado.estado);
        }
    }, [selecionado]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        const payload = {
            // "cliente_id": selecionado?.cliente_id,
            cep: cep,
            logradouro: LetraMaiuscula(logradouro),
            complemento: LetraMaiuscula(complemento),
            bairro: LetraMaiuscula(bairro),
            numero: numero,
            cidade: LetraMaiuscula(cidade),
            estado: LetraMaiuscula(estado)
        };
        
        try {
            setIsLoading(true);
            Update<any>({
                payload,
                // registros : enderecos,
                // setRegistros : setEnderecos,
                antesDeExecutar : () => {
                    setIsLoading(true);
                    setLoadingSpiner(true);
                },
                depoisDeExecutar : () => {
                    setAbrirModalEditarRegistro(false);
                    setLoadingSpiner(false);
                        setRelistar(true);
                },
                endpoint: `/enderecos/${selecionado?.id}`,
            })
            
            // await editarRegistro<any>({
            //         data : payload,
            //         setRelistar,

            //         setSelected: () => {
            //             setSelecionado(null);
            //             setAbrirModalEditarRegistro(false)
            //         },
                    
            //         setLoadingSpiner,
            //         registros,
            //         setRegistros,
            //         endpoint:`/enderecos/${selecionado?.id}`,
            //       })
            
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

    // async function buscaCep(cep: string) {
    //     try {
    //         setIsLoading(true);
    //         const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    //         if (!response.ok) {
    //             throw new Error("Erro ao buscar o CEP");
    //         }

    //         const data = await response.json();

    //         if (data.erro) {
    //             console.log("CEP não encontrado");
    //                 limparFormulario();
    //             return;
    //         }

    //         // preenche automaticamente os campos
    //         setLogradouro(data.logradouro);
    //         setBairro(data.bairro);
    //         setCidade(data.localidade);
    //         setEstado(data.uf);

    //     } catch (error) {
    //         // console.error("Erro ao buscar o CEP:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }


    useEffect(() => {
        if (cep.length === 8) {
            // buscaCep(cep);
        }
    }, [cep]);
    if (!selecionado) return null;
    if (!abrirModalEditarRegistro) return null;
  return (
    <Modal IsOpen={true} onClose={() => setAbrirModalEditarRegistro(false)} className="min-h-auto">

        <form id="formModal" onSubmit={(e) => handleSubmit(e)} className="space-y-4">

            <FormGroup label="CEP" id="cep">
                <Input id="cep" type="text"
                    maxLength={8}
                    placeholder="Digite o cep para pesquisar o endereço correspondente"
                    value={cep}
                    className='uppercase'
                    onChange={(e) => setCep(e.target.value)}
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Logradouro" id="logradouro">
                <Input id="logradouro" type="text"  
                    value={logradouro}
                    className='uppercase'
                    onChange={(e) => setLogradouro(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Complemento" id="complemento">
                <Input id="complemento" type="text"  
                    value={complemento}
                    className='uppercase'
                    onChange={(e) => setComplemento(e.target.value)}
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Bairro" id="bairro">
                <Input id="bairro" type="text"  
                    value={bairro}
                    className='uppercase'
                    onChange={(e) => setBairro(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Numero" id="numero">
                <Input id="numero" type="text"  
                    value={numero}
                    className='uppercase'
                    onChange={(e) => setNumero(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Cidade" id="cidade">
                <Input id="cidade" type="text"  
                    value={cidade}
                    className='uppercase'
                    onChange={(e) => setCidade(e.target.value)}
                    required
                    disabled={isLoading} 
                />
            </FormGroup>

            <FormGroup label="Estado" id="estado">
                <Input id="estado" type="text"  
                    value={estado}
                    className='uppercase'
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

export default EditarEndereco