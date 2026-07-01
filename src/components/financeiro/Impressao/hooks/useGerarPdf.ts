import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

import LogoPointer from "/iconepng.png";
import LogoGroupconect from "/group_conect_pdf.png";

import { formatarDinheiro } from "@src/shared/utils/dinheiro";
import { pdfTheme } from "../utils/pdfTheme";
import {
  formatarDataPdf,
  gerarNomeArquivo,
  imageToBase64
} from "../utils/pdfHelpers";

type RelatorioFinanceiro = {
  condominio: {
    id: number;
    nome: string;
  };
  periodo: {
    inicio: string;
    fim: string;
  };
  resumo: {
    entradas: number;
    saidas: number;
    saldo: number;
  };
  categorias: {
    entrada?: Record<string, number>;
    saida?: Record<string, number>;
  };
  lancamentos: {
    id: number;
    data: string;
    descricao: string;
    categoria: string;
    tipo: string;
    status: string;
    valor: number;
    forma_pagamento: string;
  }[];
};

export async function gerarPdfFinanceiro(
  relatorio: RelatorioFinanceiro,
) {
    const logoPointer = await imageToBase64(
  LogoPointer,
);

const logoGroupconect =
  await imageToBase64(
    LogoGroupconect,
  );
    
  const doc = new jsPDF();
  doc.setFillColor(248, 248, 248);
doc.rect(0, 0, 210, 297, "F");

doc.addImage(
  logoPointer,
  "PNG",
  12,
  8,
  14,
  14,
);

doc.addImage(
  logoGroupconect,
  "PNG",
  155,
  11,
  35,
  8,
);

  

  // ==========================================
  // CABEÇALHO
  // ==========================================

  doc.setDrawColor(...pdfTheme.primary);
doc.setLineWidth(0.8);
doc.line(10, 34, 200, 34);

doc.setTextColor(...pdfTheme.primary);
doc.setFontSize(20);
doc.setFont("helvetica", "bold");

doc.text(
  "RELATÓRIO FINANCEIRO POINTER",
  14,
  48,
);

doc.setTextColor(...pdfTheme.text);
doc.setFontSize(10);
doc.setFont("helvetica", "normal");

doc.text(
  `Gerado em ${dayjs().format(
    "DD/MM/YYYY",
  )}`,
  14,
  56,
);

  // ==========================================
  // DADOS DO CONDOMÍNIO
  // ==========================================

  doc.setTextColor(...pdfTheme.primary);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");

  doc.text(
    "Informações do Condomínio",
    14,
    72,
  );

  doc.setTextColor(...pdfTheme.text);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    `Condomínio: ${relatorio.condominio.nome}`,
    14,
    80,
  );

  doc.text(
    `Período: ${formatarDataPdf(
      relatorio.periodo.inicio,
    )} até ${formatarDataPdf(
      relatorio.periodo.fim,
    )}`,
    14,
    88,
  );

  doc.setTextColor(...pdfTheme.primary);
doc.setFontSize(13);
doc.setFont("helvetica", "bold");

doc.text(
  "RESUMO FINANCEIRO",
  14,
  98,
);

  // ==========================================
  // RESUMO FINANCEIRO
  // ==========================================

  autoTable(doc, {
  startY: 102,

  theme: "grid",

  head: [
    [
      "ENTRADAS",
      "SAÍDAS",
      "SALDO",
    ],
  ],

  body: [
    [
      formatarDinheiro(
        relatorio.resumo.entradas,
      ),
      formatarDinheiro(
        relatorio.resumo.saidas,
      ),
      formatarDinheiro(
        relatorio.resumo.saldo,
      ),
    ],
  ],

  styles: {
    fontSize: 11,
    cellPadding: 4,
    halign: "center",
    valign: "middle",

    lineWidth: 0.3,
    lineColor: [210, 210, 210],
  },

  headStyles: {
    fillColor: pdfTheme.primary,
    textColor: [255, 255, 255],
    fontStyle: "bold",
    halign: "center",
  },

  bodyStyles: {
    fillColor: [255, 255, 255],
    textColor: pdfTheme.text,
    fontStyle: "bold",
  },

  tableLineColor: [210, 210, 210],
  tableLineWidth: 0.3,
});

  // ==========================================
  // CATEGORIAS
  // ==========================================

  const categorias = [
    ...Object.entries(
      relatorio.categorias?.entrada || {},
    ).map(([categoria, valor]) => [
      "Entrada",
      categoria,
      formatarDinheiro(Number(valor)),
    ]),

    ...Object.entries(
      relatorio.categorias?.saida || {},
    ).map(([categoria, valor]) => [
      "Saída",
      categoria,
      formatarDinheiro(Number(valor)),
    ]),
  ];

  if (categorias.length > 0) {
    autoTable(doc, {
      startY:
        (doc as any).lastAutoTable.finalY + 10,

      head: [["Tipo", "Categoria", "Valor"]],

      body: categorias,

      headStyles: {
        fillColor: pdfTheme.primary,
        textColor: pdfTheme.white,
      },
    });
  }

  // ==========================================
  // LANÇAMENTOS
  // ==========================================

  autoTable(doc, {
    startY:
      (doc as any).lastAutoTable.finalY + 10,

    head: [
      [
        "Data",
        "Categoria",
        "Descrição",
        "Tipo",
        "Pagamento",
        "Valor",
      ],
    ],

    body: relatorio.lancamentos.map(
      (item) => [
        formatarDataPdf(item.data),
        item.categoria,
        item.descricao,
        item.tipo,
        item.forma_pagamento,
        formatarDinheiro(item.valor),
      ],
    ),

    styles: {
      fontSize: 8,
      cellPadding: 2,
      textColor: pdfTheme.text,
    },

    headStyles: {
      fillColor: pdfTheme.primary,
      textColor: pdfTheme.white,
    },

    alternateRowStyles: {
      fillColor: [248, 248, 248],
    },

    columnStyles: {
      2: {
        cellWidth: 70,
      },
    },
  });

  // ==========================================
  // RODAPÉ
  // ==========================================

  const totalPages = doc.getNumberOfPages();

  for (
    let pagina = 1;
    pagina <= totalPages;
    pagina++
  ) {
    doc.setPage(pagina);

    doc.setDrawColor(...pdfTheme.border);

    doc.line(14, 285, 195, 285);

    doc.setFontSize(9);

    doc.setTextColor(...pdfTheme.text);

    doc.text(
      "Pointer - Síndico Profissional | GroupConect - Softwares",
      14,
      290,
    );

    doc.text(
      `Página ${pagina} de ${totalPages}`,
      165,
      290,
    );
  }

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const arquivo = gerarNomeArquivo(
    relatorio.condominio.nome,
  );

  doc.save(
    `relatorio_financeiro_${arquivo}.pdf`,
  );
}