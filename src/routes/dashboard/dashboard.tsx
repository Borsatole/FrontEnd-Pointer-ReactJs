import { useContext } from "react";
import { AuthContext } from "@src/context/AuthContext";
import BarraSuperior from "@components/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { TituloPagina } from "@components/comum/Textos";
import { Alert } from "flowbite-react";


export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <>
    <BarraSuperior />
    <Container tipo="principal">
      <MenuLateral />
      <TituloPagina>Dashboard</TituloPagina>

      <Alert color="warning" withBorderAccent>
      <span>
        Seja bem vindo ao seu sistema de gerenciamento
      </span>
    </Alert>


    </Container>

    </>
  );
}
