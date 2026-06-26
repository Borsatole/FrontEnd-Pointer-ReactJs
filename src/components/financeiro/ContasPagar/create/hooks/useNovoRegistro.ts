import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { condominioService } from "@src/services/modules/condominios/condominioService";
import { categoriasService } from "@src/services/modules/financeiro/categoriasService";
import { validarFinanceiro } from "../validacao";
import { FinanceiroService } from "@src/services/modules/financeiro/financeiroService";
import { Condominio } from "@src/components/tipos";
import Alerta from "@src/components/comum/alertas";

interface FormDataFinanceiro {
  condominio: Condominio | null;
  descricao: string;
  valor: number;
  categoria: number | null;
  forma_pagamento: string;
  dia_vencimento: number | null;
  data_movimentacao: string;
  tipo_movimentacao: string;
  observacoes: string;
  status: string;
}


export function useNovoRegistro() {
 const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Listas
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const formasDePagamentos = ["Pix", "Dinheiro", "Boleto", "Cartão de Crédito", "Cartão de Débito"];
  // error
  const [erro, setErro] = useState<string | null>(null);

  const setField = (field: keyof typeof data, value: any) =>
  setData((prev) => ({ ...prev, [field]: value }));

  const [data, setData] = useState<FormDataFinanceiro>({
  condominio: null,
  descricao: "",
  valor: 0,
  categoria: null,
  forma_pagamento: "",
  dia_vencimento: null,
  data_movimentacao: dayjs().format("YYYY-MM-DD"),
  tipo_movimentacao: "saida",
  observacoes: "",
  status: "concluido",
});
  

  // Carrega listas
  useEffect(() => {
    categoriasService
      .listar({ tipo: "saida" })
      .then((dados) => setCategorias(dados.registros || []))
      .catch(console.error);

    condominioService
      .listar({})
      .then((dados) => setCondominios(dados.registros || []))
      .catch(console.error);
  }, []);

  function encontrarPorId(lista: any[], id: string | null) {
    if (!id || lista.length === 0) return null;
    return lista.find((item) => String(item.id) === id) ?? null;
    }

    // Pré-seleção via URL
    useEffect(() => {
    const cond = encontrarPorId(condominios, searchParams.get("id_condominio"));
    const cat  = encontrarPorId(categorias,  searchParams.get("id_categoria"));

    if (cond) setField("condominio", cond);
    if (cat)  setField("categoria", cat.id);
    }, [condominios, categorias]);


    useEffect(() => {
        if (!data.categoria || data.valor <= 0) return;

        const categoria = encontrarPorId(categorias, String(data.categoria));

        setField(
            "descricao",
            `${categoria?.tipo} referente a ${categoria?.categoria_item.toLowerCase()} no valor de R$ ${data.valor.toFixed(2)}`,
        );
    }, [data.categoria, data.valor]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();


    const payload = {
    id_condominio: data.condominio?.id,
    descricao: data.descricao,
    valor: data.valor,
    id_categoria: data.categoria,
    forma_pagamento: data.forma_pagamento,
    dia_vencimento: data.dia_vencimento,
    data_movimentacao: data.data_movimentacao,
    tipo_movimentacao: data.tipo_movimentacao,
    observacoes: data.observacoes,
    status: data.status,
};
    const erroValidacao = validarFinanceiro(data);

    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    setErro(null);

    try{
        const response = await FinanceiroService.criar(payload);

        if(!response.data.success){
          setErro(response.data.message);
        }

        Alerta("toast", "success", response.data.message);

        redirecionar();
    } catch(e){
        console.log(e);
        Alerta("error", "success", "Ops! Algo deu errado.");
    }
  }

  async function salvar(acao: "salvar" | "novo") {
  const payload = {
    id_condominio: data.condominio?.id,
    descricao: data.descricao,
    valor: data.valor,
    id_categoria: data.categoria,
    forma_pagamento: data.forma_pagamento,
    dia_vencimento: data.dia_vencimento,
    data_movimentacao: data.data_movimentacao,
    tipo_movimentacao: data.tipo_movimentacao,
    observacoes: data.observacoes,
    status: data.status,
  };

  const erroValidacao = validarFinanceiro(data);

  if (erroValidacao) {
    setErro(erroValidacao);
    return;
  }

  try {
    const response = await FinanceiroService.criar(payload);

    if (!response.data.success) {
      setErro(response.data.message);
      return;
    }

    Alerta("toast", "success", response.data.message);

    if (acao === "salvar") {
      redirecionar();
      return;
    }

    if (acao === "novo") {
      limparFormulario();
    }
  } catch (e) {
    console.error(e);
    Alerta("toast", "error", "Ops! Algo deu errado.");
  }
}

function limparFormulario() {
  setData({
    condominio: data.condominio,
    descricao: "",
    valor: 0,
    categoria: null,
    forma_pagamento: data.forma_pagamento,
    dia_vencimento: null,
    data_movimentacao: dayjs().format("YYYY-MM-DD"),
    tipo_movimentacao: "saida",
    observacoes: "",
    status: "pendente",
  });
}

  function redirecionar() {
    navigate("/financeiro/pagar");
  }


  return {
  condominios,
  categorias,
  formasDePagamentos,
  data,
  setField,
  erro,
  salvar,
};
}