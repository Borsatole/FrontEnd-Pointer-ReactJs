import { useContext } from "react";
import { AuthContext } from "@src/context/AuthContext";
import BarraSuperior from "@components/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { TituloPagina } from "@components/comum/Textos";
import { Alert } from "flowbite-react";
import DefaultLayout from "@src/layouts/DefaultLayout";


export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <>
    <DefaultLayout>
      <TituloPagina>Dashboard</TituloPagina>

      <Alert color="warning" withBorderAccent>
      <span>
        Seja bem vindo ao seu sistema de gerenciamento
      </span>
    </Alert>


    </DefaultLayout>

    </>
  );
}
