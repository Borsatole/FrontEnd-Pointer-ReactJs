import { TituloPagina } from '@src/components/comum/Textos'
import CardCacambaEstoque from '@src/components/estoque/CardCacambaEstoque'
import Tabela2 from '@src/components/clientes/Tabela'
import { getIcon, getIconComponent } from '@src/components/icons'
import { TabItem, Tabs } from 'flowbite-react'
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi'
import { MdDashboard } from 'react-icons/md'

function Estoque() {
  return (
    <>
    
      <TituloPagina>Clientes</TituloPagina>
      <Tabela2 />
  

      
      
    </>
  )
}

export default Estoque