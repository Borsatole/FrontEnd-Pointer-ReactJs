import {Card} from '@src/components/comum/card'
import { MdPlayCircleOutline } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { requisicaoGet } from '@src/services/requisicoes';
import { FaRegStar  } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { MdMoneyOff } from "react-icons/md";


interface CardsProps {
    queryFiltro: string;
}

interface VariacaoPeriodo {
  percentual: string;
  positivo: boolean;
}

interface RegistroItem {
  titulo: string;
  descricao: string;
  valor_formatado: string;
  variacao: VariacaoPeriodo;
}

interface RegistroProps {
  contas_a_pagar: RegistroItem;
  contas_pendentes: RegistroItem;
  contas_atrasadas: RegistroItem;
  contas_pagas: RegistroItem;
}

function Cards({ queryFiltro }: CardsProps) {
  const [registros, setRegistros] = useState<RegistroProps | null>(null);

  useEffect(() => {
    requisicaoGet(`/Financeiro/contas-a-pagar/Kpis.php?${queryFiltro}`)
      .then((response) => {
        if (response?.data.success) {
            console.log(response.data.registros);
          setRegistros(response.data.registros);
        }
      });
  }, [queryFiltro]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-3 mb-6">
      <Card
        title={registros?.contas_a_pagar.titulo ?? "Carregando..."}
        description={registros?.contas_a_pagar.descricao ?? ""}
        value={registros?.contas_a_pagar.valor_formatado ?? "R$ 0,00"}
        icon={<FaRegStar />}
        change={{
        value: 
        `
        ${registros?.contas_a_pagar.variacao?.percentual ?? ""} 
        em relação ao período anterior`,
        isPositive: registros?.contas_a_pagar.variacao?.positivo ?? true,
        }}
        color="orange"
      />

      <Card
        title={registros?.contas_pagas.titulo ?? ""}
        description={registros?.contas_pagas.descricao ?? ""}
        value={registros?.contas_pagas.valor_formatado ?? "R$ 0,00"}
        icon={<GiPayMoney />}
        change={{
        value: 
        `
        ${registros?.contas_pagas.variacao?.percentual ?? ""}% das contas selecionadas`,
        isPositive: registros?.contas_pagas.variacao?.positivo ?? true,
        }}
        color="green"
      />

      <Card
        title={registros?.contas_pendentes.titulo ?? ""}
        description={registros?.contas_pendentes.descricao ?? ""}
        value={registros?.contas_pendentes.valor_formatado ?? "R$ 0,00"}
        icon={<GiReceiveMoney />}
        color="blue"
      />

      <Card
        title={registros?.contas_atrasadas.titulo ?? ""}
        description={registros?.contas_atrasadas.descricao ?? ""}
        value={registros?.contas_atrasadas.valor_formatado ?? "R$ 0,00"}
        icon={<MdMoneyOff />}
        color="red"
      />
    </div>
  );
}

export default Cards;
