import Headermodal from "@src/components/comum/Tabelas/Headermodal";
import { useNovoRegistro } from "./hooks/useNovoRegistro";
import ErrorMessage from "@src/components/comum/Tabelas/ErrorMessage";
import { FormGroup } from "@src/components/comum/FormGroup";
import InpuSelecionarCondominio from "@src/components/comum/InputCondominio";
import { Input, TextArea } from "@src/components/comum/input";
import { SelectAtualizado } from "@src/components/comum/SelectAtualizado";
import { SwitchPadrao } from "@src/components/comum/SwitchPadrao";
import { Button } from "@src/components/comum/button";

export default function Index() {
  const {
    condominios,
    categorias,
    formasDePagamentos,
    data,
    setField,
    erro,
    salvar,
  } = useNovoRegistro();

  return (
    <div className="flex flex-col">
      <form className="flex flex-col">
        <div className="bg-white">
          <Headermodal
            icone="financeiro"
            titulo="Novo Registro"
            subtitulo="Crie um novo registro"
          />

          {erro && <ErrorMessage message={erro} />}

          <div className="bg-[var(--base-variant)] p-4">
            <FormGroup label="Condomínio" id="condominio">
              <InpuSelecionarCondominio
                listaDeCondominios={condominios}
                condominio={data.condominio}
                setCondominio={(cond) => setField("condominio", cond)}
              />
            </FormGroup>

            <FormGroup label="Descrição" id="descricao">
              <TextArea
                name="descricao"
                id="descricao"
                value={data.descricao}
                onChange={(e: any) => setField("descricao", e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Categoria" id="id_categoria">
              <SelectAtualizado
                name="id_categoria"
                id="id_categoria"
                labelKey="categoria_item"
                valueKey="id"
                options={categorias}
                value={data.categoria || ""}
                onChange={(e) => setField("categoria", e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Forma de pagamento" id="forma_pagamento">
              <SelectAtualizado
                name="forma_pagamento"
                id="forma_pagamento"
                options={formasDePagamentos}
                value={data.forma_pagamento}
                onChange={(e) => setField("forma_pagamento", e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Valor" id="valor">
              <Input
                type="number"
                name="valor"
                id="valor"
                step="0.01"
                value={data.valor || ""}
                onChange={(e) => setField("valor", Number(e.target.value))}
              />
            </FormGroup>

            <FormGroup label="Data da movimentação" id="data_movimentacao">
              <Input
                type="date"
                name="data_movimentacao"
                id="data_movimentacao"
                value={data.data_movimentacao}
                onChange={(e) => setField("data_movimentacao", e.target.value)}
              />
            </FormGroup>

            <FormGroup label="Status da conta" id="status">
              <div className="flex items-center justify-between p-3 rounded-lg border-3 border-[var(--base-color)] bg-[var(--base-variant)]">
                <span
                  className={`text-sm font-medium ${data.status === "concluido" ? "text-green-600" : "text-yellow-600"}`}
                >
                  {data.status === "concluido"
                    ? "Conta Paga"
                    : "Conta pendente"}
                </span>
                <SwitchPadrao
                  checked={data.status === "concluido"}
                  onChange={(checked) =>
                    setField("status", checked ? "concluido" : "pendente")
                  }
                />
              </div>
            </FormGroup>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <Button
              type="button"
              className="w-full"
              loading={false}
              onClick={() => salvar("salvar")}
            >
              Salvar e sair
            </Button>
            <Button
              type="button"
              className="w-full"
              loading={false}
              onClick={() => salvar("novo")}
            >
              Salvar e continuar lançando
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
