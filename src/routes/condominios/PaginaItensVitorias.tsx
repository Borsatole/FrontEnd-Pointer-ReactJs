import { TituloPagina } from "@components/comum/Textos";
import ContainerSecundario from "@src/components/comum/containerSecundario";
import { getIcon, getIconComponent } from "@src/components/icons";
import Tabela from "@src/components/vistoriasItensPagina/Tabela";

export default function Visitas() {
  return (
    <>
      <ContainerSecundario>
        <TituloPagina>Itens Vistoria</TituloPagina>
        <Tabela />
      </ContainerSecundario>
    </>
  );
}
