import ContainerSecundario from "@src/components/comum/containerSecundario";
import { TituloPagina } from "@src/components/comum/Textos";
import Index from "@src/components/financeiro/ContasReceber/create/index";

function NewContaReceber() {
  return (
    <ContainerSecundario className="flex flex-col gap-4">
      <TituloPagina>Novo Lançamento</TituloPagina>
      <Index />
    </ContainerSecundario>
  );
}

export default NewContaReceber;
