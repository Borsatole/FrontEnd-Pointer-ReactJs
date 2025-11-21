
import { Cliente, Endereco } from '@src/components/tipos'
import { useEffect, useState } from 'react'
import BotaoSeletor from '@src/components/comum/buttonSelected'
import { BtnAcao } from '@src/components/comum/personalizado'
import NovoEndereco from './NovoEndereco'
import EditarEndereco from './EditarEndereco'
import { Delete } from '@src/services/crud2'

interface EnderecosProps {

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

function Enderecos({
  enderecos, 
  registros, 
  setRegistros, 
  setRelistar, 
  setEnderecos, 
  selectedProduto, 
  setLoadingSpiner, 
  setSelectedProduto, 
  ClassName, ...rest} : EnderecosProps) {
  const [selecionado, setSelecionado] = useState<Endereco | null>(null);
  const [abrirModalNovoRegistro, setAbrirModalNovoRegistro] = useState(false);
  const [abrirModalEditarRegistro, setAbrirModalEditarRegistro] = useState(false);

  function toglleSelecionado(endereco: Endereco) {
    if (selecionado?.id === endereco.id) {
      return setSelecionado(null);
    }
    setSelecionado(endereco);
  }

  if (!enderecos) return null
  return (
    <div className={`
      ${ClassName} 
      flex flex-col gap-2 bg-[var(--base-color)] p-3  rounded-lg shadow-md`} 
      {...rest}>


        {/* barra de botoes */}
        <div className="flex gap-2 justify-end">
        <BtnAcao
          tipo="adicionar"
          text="Novo Endereço"
          disabled={Boolean(selecionado)}
          onClick={() => setAbrirModalNovoRegistro(true)}
        />

        <BtnAcao
          tipo="editar"
          disabled={!selecionado}
          onClick={() => setAbrirModalEditarRegistro(true)}
        />

        <BtnAcao
          tipo="deletar"
          disabled={!selecionado}
          onClick={() => {
            Delete<any>({
              registro: selecionado?.id,
              endpoint: `/enderecos/${selecionado?.id}`,
              depoisDeExecutar: () => {
                setRelistar(true);
              }
            })
  
            }
          }
            
        />
        </div>

        <div className='h-55 flex flex-col gap-1 overflow-y-auto'>

      {enderecos.map((endereco) => (
        <BotaoSeletor
          className="w-full"
          key={endereco.id}
          value={String(endereco.id)}
          selectedValue={String(selecionado?.id)}
          onClick={() => toglleSelecionado(endereco)}
          label={`${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}`}
        />
        
        
      ))}

        </div>


        {abrirModalNovoRegistro && 
        <NovoEndereco
          // Comandos do Endereco.tsx
          setAbrirModalNovoRegistro={setAbrirModalNovoRegistro}
          AbrirModalNovoRegistro={abrirModalNovoRegistro}

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
          
        /> }

        {abrirModalEditarRegistro && 
        <EditarEndereco
          // Comandos do Endereco.tsx
          setAbrirModalEditarRegistro={setAbrirModalEditarRegistro}
          abrirModalEditarRegistro={abrirModalEditarRegistro}
          selecionado={selecionado}
          setSelecionado={setSelecionado}

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
          
        />}


    </div>
  )
}

export default Enderecos