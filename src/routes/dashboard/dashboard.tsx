import { useContext, useEffect, useState } from "react";
import { TituloPagina } from "@components/comum/Textos";
import { requisicaoGet } from "@src/services/requisicoes";
import { Datas } from "@src/services/funcoes-globais";
import dayjs from 'dayjs';
import CardOpcoes from "@src/components/comum/cardOpcoes";



export default function Dashboard() {

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
      // nome: "Le",
    });

    requisicaoGet(`/usuarios?${params.toString()}`)
      .then((response) => {
        if (response?.data.success) {
          setRegistros(response.data.registros);
          setTotalResultados(response.data.total_registros);
        }

        setLoadingSpiner(false);
        setRelistar(false);
        setLoading(false);
      });
  }, [relistar]);



  if (!registros) return null;


  return (
    <>

      <TituloPagina>Dashboard</TituloPagina>

      <div className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3
      gap-2
      justify-left">


        <CardOpcoes 
        icone="demandas"
        descricao="Demandas Diarias como entregas e retiradas de equipamentos."
        titulo="Demandas"
        rota="/"
        />
        <CardOpcoes 
        icone="ordemdeservico"
        descricao="Demandas Diarias como entregas e retiradas de equipamentos."
        titulo="Ordem de Serviço"
        rota="/"
        />

        

        <CardOpcoes 
        icone="clientes"
        descricao="Gerencie o cadastro de clientes da sua empresa"
        titulo="Clientes"
        rota="/"
        />

        <CardOpcoes 
        icone="orcamento"
        descricao="Gerencie o cadastro de clientes da sua empresa"
        titulo="Orçamentos"
        rota="/"
        />

        <CardOpcoes 
        icone="permissoes"
        descricao="Gerencie as permissoes de acesso e pelo nivel de usuario controle os modulos do sistema"
        titulo="Permissoes de Acesso"
        rota="/acesso-niveis"
        />


        <CardOpcoes 
        icone="estoque"
        descricao="Gerencie suas caçambas em estoque."
        titulo="Estoque"
        rota="/estoque"
        />

        <CardOpcoes 
        icone="rotasetaxas"
        descricao="Gerencie taxas de entregas e ruas especiais."
        titulo="Rotas e Taxas"
        rota="/"
        />

      </div>

      {/* <Button
        onClick={() => setRelistar(true)}
        loading={loadingSpiner}
        disabled={loading}
      >
        Atualizar
      </Button>

      <ul className="">
        {registros.map((item: any) => (
          <li className="text-blue-500 pb-2" key={item.id}>{item.email}</li>
        ))}
      </ul> */}

  </>
  );
}