import BarraSuperior from "@components/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { TituloPagina } from "@components/comum/Textos";
import TabelaCategorias from "@src/components/Estoque/categorias/TabelaCategorias";


export default function Categorias() {
    

  return (
    <>
    <BarraSuperior />
    <Container tipo="principal">
      <MenuLateral />
      <TituloPagina>Categorias de Estoque</TituloPagina>

      <TabelaCategorias />

    </Container>

    </>
  );
}



