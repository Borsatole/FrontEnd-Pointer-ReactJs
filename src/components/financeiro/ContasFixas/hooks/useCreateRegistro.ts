import { useEffect, useState } from "react";
import { UseTabela } from "@src/components/comum/Tabelas/TabelaContext";
import { useCrudRegistro } from "@src/hooks/useCrudRegistro";
import { validarRegistro } from "../forms/validator/validacao";
import { condominioService } from "@src/services/modules/condominios/condominioService";
import { Condominio } from "@src/components/tipos";

interface FormDataEditar {
  condominio: any;
  descricao: string;
  valor: number;
  recorrencia: number;
  id_categoria: string;
  forma_pagamento: string;
  dia_vencimento: number | null;
  data_fim: string | null;
}

const config = {
  endpoint: "/financeiro-contas-fixas",
  modo: "create",
  icone: "contasfixas",
  definicoes: {
    relistar: true,
    fecharModal: true,
  },
};

export function useCreateRegistro() {
  const { registros, selectedRegistro,data } = UseTabela();

  const [erro, setErro] = useState<string | null>(null);
  const [mostrarRecorrencia, setMostrarRecorrencia] = useState(false);

  const [condominios, setCondominios] = useState<Condominio[]>([]);

  const [form, setForm] = useState<FormDataEditar>({
  condominio: null,
  descricao: "",
  valor: 0,
  recorrencia: 1,
  id_categoria: "",
  forma_pagamento: "",
  dia_vencimento: 1,
  data_fim: null,
});

// Carrega listas
  useEffect(() => {
    condominioService
      .listar({})
      .then((dados) => setCondominios(dados.registros || []))
      .catch(console.error);
  }, []);

  const registro = registros.find(
    (p) => p.id === selectedRegistro?.id
  );

  const setField = (
  field: keyof FormDataEditar,
  value: any
) => {
  setForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  useEffect(() => {
  if (!registro) return;

  setForm({
    condominio: registro.condominio,
    descricao: registro.descricao,
    valor: registro.valor,
    recorrencia: registro.recorrencia,
    id_categoria: registro.id_categoria,
    forma_pagamento: registro.forma_pagamento,
    dia_vencimento: registro.dia_vencimento,
    data_fim: registro.data_fim,
  });
}, [registro]);

  const { loadingcrud, handleSubmit, fecharModal } =
    useCrudRegistro({
      modo: "create",
      endpoint: config.endpoint,
      definicoes: config.definicoes,
    });

  const formData = {
  descricao: form.descricao,
  valor: form.valor,
  recorrencia: form.recorrencia,
  id_categoria: form.id_categoria,
  id_condominio: form.condominio?.id,
  forma_pagamento: form.forma_pagamento,
  dia_vencimento: form.dia_vencimento,
  data_fim: form.data_fim,
};

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const erroValidacao = validarRegistro(formData);

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    handleSubmit(e, formData);
  };

  return {
  data,
  config,
  erro,
  loadingcrud,
  fecharModal,
  onSubmit,

  mostrarRecorrencia,
  setMostrarRecorrencia,

  condominios,
  form,
  setField,
};
}