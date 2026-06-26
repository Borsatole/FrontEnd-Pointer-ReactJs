import dayjs from "dayjs";

export function formatarDataPdf(data: string) {
  return dayjs(data).format("DD/MM/YYYY");
}

export function gerarNomeArquivo(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toLowerCase();
}

export async function imageToBase64(
  url: string,
): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.readAsDataURL(blob);
  });
}