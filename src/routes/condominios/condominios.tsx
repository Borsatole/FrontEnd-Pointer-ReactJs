
import { TituloPagina } from "@components/comum/Textos";
import Tabela from "@components/condominios/Tabela"
import DefaultLayout from "@src/layouts/DefaultLayout";


export default function Dashboard() {


  return (
    <>
      <DefaultLayout>
      <TituloPagina>Condominios</TituloPagina>
      <Tabela />
      </DefaultLayout>

    </>
  );
}
