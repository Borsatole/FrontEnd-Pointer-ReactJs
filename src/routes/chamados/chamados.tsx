import TabelaRegistros from '@src/components/chamados/Tabela'
import { Button } from '@src/components/comum/button'
import { TituloPagina } from '@src/components/comum/Textos'
import DefaultLayout from '@src/layouts/DefaultLayout'
import React from 'react'

function Chamados() {
  return (
    <>
    <DefaultLayout>
      <TituloPagina>Chamados</TituloPagina>

      <TabelaRegistros />
      </DefaultLayout>
    </>
  )
}

export default Chamados