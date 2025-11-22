import { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'; // importa o locale pt-br
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat); // ativa o plugin

export function useDiasSemana(qtdDias: number = 7) {
  const hoje = dayjs().locale('pt-br'); // aplica o locale

  const dias = Array.from({ length: qtdDias }).map((_, i) => {
    const data = hoje.add(i, 'day');
    return {
      data,
      dia: data.date(),
      mes: data.month() + 1,
      ano: data.year(),
      diaSemana: data.format('ddd'),
      dataFormatada: data.format('YYYY-MM-DD')

    };
  });

  const [selecionado, setSelecionado] = useState(dias[0]);

  return { dias, selecionado, setSelecionado };
}
