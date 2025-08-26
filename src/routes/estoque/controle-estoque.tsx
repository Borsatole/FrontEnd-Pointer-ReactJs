import { useContext } from "react";
import { AuthContext } from "@src/context/AuthContext";
import BarraSuperior from "@components/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { TituloPagina } from "@components/comum/Textos";
import Tabela from "@src/components/Estoque/tabelaprodutos/Tabela";


export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <>
    <BarraSuperior />
    <Container tipo="principal">
      <MenuLateral />
      <TituloPagina>Controle de Estoque</TituloPagina>

      <Tabela />


    </Container>

    </>
  );
}
