import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BarraSuperior from "../components/barraSuperior";
import MenuLateral from "../components/MenuLateral/MenuLateral";
import Container from "../components/comum/container";
import { TituloPagina } from "../components/comum/Textos";
import TabelaProdutos from "../components/tabelaprodutos/TabelaProdutos";


export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <>
    <BarraSuperior />
    <Container tipo="principal">
      <MenuLateral />
      <TituloPagina>Dashboard</TituloPagina>

      <TabelaProdutos />


    </Container>

    </>
  );
}
