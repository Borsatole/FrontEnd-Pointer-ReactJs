

export function Datas() {
  const hoje = new Date();

  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    .toISOString()
    .split("T")[0];

  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const dataDeHoje = new Date().toISOString().split("T")[0];

  const dataFormatada = (data?: string | Date | null) => {
    if (!data) return "";

    // Se já for objeto Date válido
    if (data instanceof Date && !isNaN(data.getTime())) {
      return data.toLocaleDateString("pt-BR");
    }

    if (typeof data === "string") {
      // Sempre pega só a parte da data (YYYY-MM-DD)
      const soData = data.split(" ")[0]; 

      if (/^\d{4}-\d{2}-\d{2}$/.test(soData)) {
        const [ano, mes, dia] = soData.split("-").map(Number);
        return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${ano}`;
      }
    }

    return ""; // fallback seguro
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

export function PrimeraLetraMaiuscula(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function MaxCaracteres(str: string, max: number): string {
  if (str.length > max) return str.slice(0, max) + "...";
  return str;
}

export function gerarPaginas(paginaAtual: number, total: number, max = 5): number[] {
    const paginas = [];
    const metade = Math.floor(max / 2);
    let inicio = Math.max(1, paginaAtual - metade);
    let fim = Math.min(total, inicio + max - 1);
    if (fim - inicio + 1 < max) inicio = Math.max(1, fim - max + 1);
    for (let i = inicio; i <= fim; i++) paginas.push(i);
    return paginas;
}