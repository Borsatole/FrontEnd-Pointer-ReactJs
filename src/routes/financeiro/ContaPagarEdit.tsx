import ContainerSecundario from "@src/components/comum/containerSecundario";
import { TituloPagina } from "@src/components/comum/Textos";
import Index from "@src/components/financeiro/ContasPagar/edit/index";

function NewContaPagar() {
  return (
    <ContainerSecundario className="flex flex-col gap-4">
      <TituloPagina>Editar Lançamento</TituloPagina>
      <Index />
    </ContainerSecundario>
  );
}

export default NewContaPagar;
