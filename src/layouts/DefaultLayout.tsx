import BarraSuperior from "@src/components/barraSuperior/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <>
      <BarraSuperior />
      <Container tipo="principal">
        
        <MenuLateral />
        <div className="conteudo flex-1">
          <Outlet />
        </div>
      </Container>
    </>
  );
}