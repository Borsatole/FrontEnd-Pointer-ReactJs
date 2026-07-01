import { FormGroup } from "@src/components/comum/FormGroup";
import { Input } from "@src/components/comum/input";
import ErrorMessage from "@src/components/comum/Tabelas/ErrorMessage";
import Footermodal from "@src/components/comum/Tabelas/Footermodal";
import Headermodal from "@src/components/comum/Tabelas/Headermodal";
import Modal from "@src/components/modal/Modal";
import React from "react";
import { useEditarRegistro } from "../hooks/useUpdateRegistro";
import { BtnSelectMes } from "../NovoRegistro";
import CalendarDays from "../CalendarDays";
import { Alert } from "flowbite-react";
import { SelectAtualizado } from "@src/components/comum/SelectAtualizado";
import InpuSelecionarCondominio from "@src/components/comum/InputCondominio";
import { dateUtils } from "@src/shared/utils/date";

function EditForm() {
  const {
    data,
    config,
    erro,
    loadingcrud,
    fecharModal,
    onSubmit,
    form,
    setField,
    mostrarRecorrencia,
    condominios,
    setMostrarRecorrencia,
  } = useEditarRegistro();
  return (
    <Modal IsOpen={true} onClose={fecharModal} className="min-h-auto">
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Headermodal
          icone={config.icone}
          titulo="Editar Registro"
          subtitulo="Edite o registro"
        />
        {erro && <ErrorMessage message={erro} />}

        <div className="bg-[var(--base-variant)] p-4">
          <FormGroup label="Condomínio" id="condominio">
            <InpuSelecionarCondominio
              listaDeCondominios={condominios}
              condominio={form.condominio}
              setCondominio={(condominio) => setField("condominio", condominio)}
            />
          </FormGroup>

          <FormGroup label="Descricao" id="descricao">
            <Input
              type="text"
              name="descricao"
              id="descricao"
              value={form.descricao || ""}
              onChange={(e) => setField("descricao", e.target.value)}
            />
          </FormGroup>

          <FormGroup label="Valor" id="valor">
            <Input
              type="number"
              name="valor"
              id="valor"
              value={form.valor || ""}
              onChange={(e) => setField("valor", Number(e.target.value))}
            />
          </FormGroup>

          <FormGroup label="Recorrencia" id="valor">
            <div className="gap-1 grid grid-cols-1 sm:grid-cols-3 justify-start items-center">
              <BtnSelectMes
                texto="a cada mês"
                value={1}
                recorrenciaAtual={form.recorrencia}
                onClick={() => setField("recorrencia", 1)}
              />

              <BtnSelectMes
                texto="a cada ano"
                value={12}
                recorrenciaAtual={form.recorrencia}
                onClick={() => setField("recorrencia", 12)}
              />

              <BtnSelectMes
                texto="a cada 3 meses"
                value={3}
                recorrenciaAtual={form.recorrencia}
                onClick={() => setField("recorrencia", 3)}
              />

              <BtnSelectMes
                texto="a cada 6 meses"
                value={6}
                recorrenciaAtual={form.recorrencia}
                onClick={() => setField("recorrencia", 6)}
              />

              <BtnSelectMes
                texto="Personalizado"
                value={0}
                onClick={() => setMostrarRecorrencia(!mostrarRecorrencia)}
              />
            </div>
          </FormGroup>

          <FormGroup
            label="Recorrencia"
            id="recorrencia"
            className={mostrarRecorrencia ? "" : "hidden"}
          >
            <Input
              type="number"
              name="recorrencia"
              id="recorrencia"
              value={form.recorrencia || ""}
              onChange={(e) => setField("recorrencia", Number(e.target.value))}
            />
          </FormGroup>

          <FormGroup label="Dia de vencimento" id="dia_vencimento">
            <CalendarDays
              daySelecionado={form.dia_vencimento}
              setDay={(dia) => setField("dia_vencimento", dia)}
            />
          </FormGroup>

          <FormGroup label="Data Final" id="data_fim">
            <Input
              type="date"
              name="data_fim"
              id="data_fim"
              value={form.data_fim || ""}
              onChange={(e) => setField("data_fim", e.target.value)}
            />

            <Alert color="warning" className="mt-3 p-4">
              <span className="text-sm font-semibold">Atenção: </span>
              <span className="text-xs">
                Caso não houver data final, se repetirá o lançamento sem uma
                data limite.
              </span>
            </Alert>
          </FormGroup>

          <FormGroup label="Ultima Recorrencia" id="ultima_recorrencia">
            <Input
              disabled
              type="text"
              name="descricao"
              id="descricao"
              value={dateUtils.formatarParaBr(form.ultima_recorrencia) || ""}
              onChange={(e) => setField("ultima_recorrencia", e.target.value)}
            />
          </FormGroup>

          <FormGroup label="Categoria" id="id_categoria">
            <SelectAtualizado
              name="id_categoria"
              id="id_categoria"
              labelKey="categoria_item"
              valueKey="id"
              options={data?.categorias || []}
              value={form.id_categoria}
              onChange={(e) => setField("id_categoria", e.target.value)}
            />
          </FormGroup>

          <FormGroup label="Forma de pagamento" id="forma_pagamento">
            <SelectAtualizado
              name="forma_pagamento"
              id="forma_pagamento"
              options={data?.formasPagamento || []}
              value={form.forma_pagamento}
              onChange={(e) => setField("forma_pagamento", e.target.value)}
            />
          </FormGroup>
        </div>
        <Footermodal loading={loadingcrud} />
      </form>
    </Modal>
  );
}

export default EditForm;
