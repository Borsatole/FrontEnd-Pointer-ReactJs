
import BarraSuperior from "@components/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { TituloPagina } from "@components/comum/Textos";
import Tabela from "@components/condominios/Tabela"


export default function Dashboard() {


  return (
    <>
    <BarraSuperior />
    <Container tipo="principal">
      <MenuLateral />
      <TituloPagina>Condominios</TituloPagina>
      <Tabela />

    </Container>

    </>
  );
}
