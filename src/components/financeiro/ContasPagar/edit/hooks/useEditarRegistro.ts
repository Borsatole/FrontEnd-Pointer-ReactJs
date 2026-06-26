import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export function useEditarRegistro() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Listas
  const [condominios, setCondominios] = useState<Condominio[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const formasDePagamentos = ["Pix", "Dinheiro", "Boleto", "Cartão de Crédito", "Cartão de Débito"];
  
  // Estados de Controle de Tela (Loading e Erro)
  const [loading, setLoading] = useState<boolean>(!!id); // Começa true se for uma edição
  const [registroNaoEncontrado, setRegistroNaoEncontrado] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

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

  const setField = (field: keyof typeof data, value: any) =>
    setData((prev) => ({ ...prev, [field]: value }));

  // Carrega listas gerais
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

  // Busca o registro para edição
  useEffect(() => {
    if (!id || condominios.length === 0 || categorias.length === 0) return;

    setLoading(true);
    setRegistroNaoEncontrado(false);

    FinanceiroService.buscar(Number(id))
      .then((response) => {
        const reg = response.data?.registro;

        if (reg) {
          const condObjeto = condominios.find(c => Number(c.id) === Number(reg.id_condominio)) || null;

          setData({
            condominio: condObjeto,
            descricao: reg.descricao || "",
            valor: Number(reg.valor) || 0,
            categoria: reg.id_categoria ? Number(reg.id_categoria) : null,
            forma_pagamento: reg.forma_pagamento || "",
            dia_vencimento: reg.dia_vencimento ? Number(reg.dia_vencimento) : null,
            data_movimentacao: reg.data_movimentacao || dayjs().format("YYYY-MM-DD"),
            tipo_movimentacao: reg.tipo_movimentacao || "saida",
            observacoes: reg.observacoes || "",
            status: reg.status || "concluido",
          });
        } else {
          // Se a API responder sucesso mas sem o objeto 'registro'
          setRegistroNaoEncontrado(true);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar registro:", error);
        setRegistroNaoEncontrado(true); // Ativa a tela de erro se a API falhar (ex: 404 Not Found)
      })
      .finally(() => {
        setLoading(false); // Desliga o loading independente de ter dado certo ou errado
      });

  }, [id, condominios, categorias]);

  function encontrarPorId(lista: any[], idBusca: string | null) {
    if (!idBusca || lista.length === 0) return null;
    return lista.find((item) => String(item.id) === idBusca) ?? null;
  }

  // Gerador automático de descrição
  useEffect(() => {
    if (!data.categoria || data.valor <= 0 || loading) return;

    const categoria = encontrarPorId(categorias, String(data.categoria));
    if (data.descricao && data.descricao.includes("referente a")) return;

    setField(
      "descricao",
      `${categoria?.tipo || "Saída"} referente a ${categoria?.categoria_item?.toLowerCase() || ""} no valor de R$ ${data.valor.toFixed(2)}`,
    );
  }, [data.categoria, data.valor, loading]);

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
      const response = id 
        ? await FinanceiroService.atualizar(Number(id), payload)
        : await FinanceiroService.criar(payload);

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
      Alerta("toast", "error", "Ops! Algo deu errado ao salvar.");
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
    loading,
    registroNaoEncontrado,
    redirecionar
  };
}