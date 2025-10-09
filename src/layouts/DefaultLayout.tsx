import BarraSuperior from "@src/components/barraSuperior/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";


export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BarraSuperior />
      <Container tipo="principal">
        <MenuLateral />
        <div className="conteudo flex-1"> {children}</div>
      </Container>
    </>
  );
}