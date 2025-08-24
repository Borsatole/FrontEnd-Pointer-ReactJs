

export function Datas() {
  const hoje = new Date();

  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    .toISOString()
    .split("T")[0];

  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const dataDeHoje = new Date().toISOString().split("T")[0];

  const dataFormatada = (data: string | Date) => {
  if (!data) return "";
  const [ano, mes, dia] = data.toString().split("-").map(Number);
  return `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${ano}`;
};


  return { primeiroDia, ultimoDia, dataFormatada, dataDeHoje };
}

export function Valores() {
  const dinheiro = (valor: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  return { dinheiro };
}