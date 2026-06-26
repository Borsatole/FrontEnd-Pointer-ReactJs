import { Button } from "@src/components/comum/button";
import ContainerCaixa from "@src/components/comum/ContainerCaixa";
import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import InpuSelecionarCondominio from "@src/components/comum/InputCondominio";
import React, { useState } from "react";
import { usePrinter } from "@src/components/financeiro/Impressao/hooks/usePrinter";

function ImpressaoRelatorios() {
  const { condominios, setField, data, handleSubmit } = usePrinter();
  return (
    <ContainerCaixa>
      <form className="" onSubmit={handleSubmit}>
        <FormGroup label="Condominio" id="id_condominio">
          <InpuSelecionarCondominio
            listaDeCondominios={condominios}
            condominio={data.condominio}
            setCondominio={(cond) => setField("condominio", cond)}
          />
        </FormGroup>

        <FormGroup label="Data Inicial" id="data_inicial">
          <Input
            type="date"
            id="data_inicial"
            value={data.data_inicial}
            onChange={(e) => setField("data_inicial", e.target.value)}
          />
        </FormGroup>

        <FormGroup label="Data Final" id="data_final">
          <Input
            type="date"
            id="data_final"
            value={data.data_final}
            onChange={(e) => setField("data_final", e.target.value)}
          />
        </FormGroup>

        <Button className="w-full mt-3" type="submit">
          Baixar PDF
        </Button>
      </form>
    </ContainerCaixa>
  );
}

export default ImpressaoRelatorios;
