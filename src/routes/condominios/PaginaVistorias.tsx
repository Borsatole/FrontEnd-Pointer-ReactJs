import { TituloPagina } from "@components/comum/Textos";
import ContainerSecundario from "@src/components/comum/containerSecundario";
import { getIcon, getIconComponent } from "@src/components/icons";
import Tabela from "@src/components/vistoriasPagina/Tabela";

export default function Visitas() {
  return (
    <>
      <ContainerSecundario>
        <TituloPagina>Vistorias</TituloPagina>
        <Tabela />
      </ContainerSecundario>
    </>
  );
}
