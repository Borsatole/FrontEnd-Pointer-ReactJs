import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/context/AuthContext";
import { TituloPagina } from "@components/comum/Textos";
import DefaultLayout from "@src/layouts/DefaultLayout";
import { requisicaoGet } from "@src/services/requisicoes";
import { Datas } from "@src/services/funcoes-globais";
import dayjs from 'dayjs';
import { Button } from "@src/components/comum/button";



export default function Dashboard() {
  const { dataFormataComHora } = Datas();

  const now = dayjs();
  const lastMonth = now.subtract(1, "week").format("YYYY-MM-DD");
  

  // Estados principais
  const [registros, setRegistros] = useState([]);
  const [totalResultados, setTotalResultados] = useState(0);

  // Estados de controle
  const [relistar, setRelistar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingSpiner, setLoadingSpiner] = useState(true);

  // Buscar dados da API
  useEffect(() => {
    if (!relistar) return;
    setLoadingSpiner(true);

    const params = new URLSearchParams({
      data_minima:"",
      data_maxima: "",
    });

    requisicaoGet(`/usuarios?${params.toString()}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.Registros);
          setTotalResultados(response.data.total_registros);
        }

        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);
      });
  }, [relistar]);



  if (!registros) return null;


  return (
    <DefaultLayout>
      <TituloPagina>Dashboard</TituloPagina>

      <Button
        onClick={() => setRelistar(true)}
        loading={loadingSpiner}
        disabled={loading}
      >
        Atualizar
      </Button>

      <ul>
        {registros.map((item: any) => (
          <li key={item.id}>{item.email}</li>
        ))}
      </ul>


    </DefaultLayout>
  );
}