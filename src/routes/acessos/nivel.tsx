import { TituloPagina } from '@src/components/comum/Textos'
import Tabela from '@src/components/permissoesacesso/niveldeacesso/niveis-acesso/Tabela';
import DefaultLayout from '@src/layouts/DefaultLayout'


function NivelAcesso() {

  return (
    <DefaultLayout>
        <TituloPagina>Niveis de Acesso</TituloPagina>
        <Tabela/>
        </DefaultLayout>
  )
}

export default NivelAcesso