// whatsapp.ts
import { DadosLocacao } from "@src/components/tipos";
import dayjs from "dayjs";

export function montarMensagemWhatsApp(registro: DadosLocacao, selecionado: any) {

  function formatarData(data: string) {
    return dayjs(data).format('DD/MM/YYYY');
  }

  const dataInicioFormatada = formatarData(registro.data_inicio);
  const dataFimFormatada = formatarData(registro.data_fim);

  
  const dados = registro.dados_locacao;

  const isEntrega = registro.data_inicio === selecionado.dataFormatada;

  const tipo = isEntrega ? "↗️ ENTREGA" : "↙️ COLETA";

  return `
*${tipo}*
\`\`\`
✅ DADOS DE LOCAÇÃO
\`\`\`
🔘 *Item:* ${dados?.item_nome || "NÃO CADASTRADO"}
🔘 *Categoria:* ${dados?.item_categoria || "NÃO CADASTRADO"}
🔘 *Forma Pagamento* ${dados?.forma_pagamento || "NÃO CADASTRADO"}
🔘 *Pagamento* ${registro.preco_total || "NÃO CADASTRADO"}
🔘 *Data de Entrega:* ${dataInicioFormatada || "NÃO CADASTRADO"}
🔘 *Data de Retirada:* ${dataFimFormatada || "NÃO CADASTRADO"}


\`\`\`
✅ DADOS DO CLIENTE
\`\`\`
🔘 *Cliente:* ${dados?.cliente_nome || "NÃO CADASTRADO"}
🔘 *Telefone:* ${dados?.cliente_telefone || "NÃO CADASTRADO"}
🔘 *Logradouro:* ${dados?.logradouro || "NÃO CADASTRADO"}
🔘 *N°:* ${dados?.numero || "NÃO CADASTRADO"}
🔘 *Bairro:* ${dados?.bairro || "NÃO CADASTRADO"}
🔘 *Complemento:* ${dados?.complemento || ""}
🔘 *Observações:* ${dados?.observacoes ?? ""}
  `;
}

export function enviarWhatsapp(registro: DadosLocacao, selecionado: any) {
  const mensagem = montarMensagemWhatsApp(registro, selecionado);
  const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank");
}
