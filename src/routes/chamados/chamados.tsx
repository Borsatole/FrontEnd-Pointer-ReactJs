import { TituloPagina } from "@components/comum/Textos";
import ContainerSecundario from "@src/components/comum/containerSecundario";
import Tabela from "@src/components/chamados/Tabela";

export default function Dashboard() {
  return (
    <>
      <ContainerSecundario>
        <TituloPagina>Chamados</TituloPagina>
        <Tabela />
      </ContainerSecundario>
    </>
  );
}
