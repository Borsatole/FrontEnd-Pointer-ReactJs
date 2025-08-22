import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaHandHoldingUsd } from "react-icons/fa";
import { MdPayments, MdAttachMoney } from "react-icons/md";
import { Categoria } from "@components/tipos";
import { requisicaoGet } from "@services/requisicoes";
import LoadingSkeleton from "@src/components/loader/LoadingSkeleton";
import TabelaPersonalizada from "@components/comum/TabelaCategorias"; // Seu componente

function CategoriasFinanceiro() {
  const [loading, setLoading] = useState(false);
  const [loadingSpiner, setLoadingSpiner] = useState(false);
  const [categoriasAPagar, setCategoriasAPagar] = useState<Categoria[]>([
    { id: 1, nome: "Aluguel e Condomínio" },
    { id: 2, nome: "Energia Elétrica" },
    { id: 3, nome: "Água e Esgoto" },
    { id: 4, nome: "Internet e Telefone" },
    { id: 5, nome: "Combustível" },
    { id: 6, nome: "Manutenção Equipamentos" },
    { id: 7, nome: "Material de Escritório" },
    { id: 8, nome: "Impostos e Taxas" },
    { id: 9, nome: "Salários e Benefícios" },
    { id: 10, nome: "Marketing e Publicidade" },
    { id: 11, nome: "Seguros" },
    { id: 12, nome: "Consultoria Contábil" }
  ]);
  
  const [categoriasAReceber, setCategoriasAReceber] = useState<Categoria[]>([
    { id: 1, nome: "Vendas à Vista" },
    { id: 2, nome: "Vendas a Prazo" },
    { id: 3, nome: "Prestação de Serviços" },
    { id: 4, nome: "Aluguel de Equipamentos" },
    { id: 5, nome: "Juros e Rendimentos" },
    { id: 6, nome: "Vendas Online" },
    { id: 7, nome: "Parcerias Comerciais" },
    { id: 8, nome: "Consultoria Técnica" },
    { id: 9, nome: "Licenciamento" },
    { id: 10, nome: "Dividendos" }
  ]);
  
  const [relistar, setRelistar] = useState(false);

  // Estados para modais
  const [abrirModalAdicionarAPagar, setAbrirModalAdicionarAPagar] = useState(false);
  const [abrirModalAdicionarAReceber, setAbrirModalAdicionarAReceber] = useState(false);
  const [selectedCategoriaAPagar, setSelectedCategoriaAPagar] = useState<Categoria | null>(null);
  const [selectedCategoriaAReceber, setSelectedCategoriaAReceber] = useState<Categoria | null>(null);

  // Handlers
  const handleDeletarAPagar = (categoria: Categoria) => {
    console.log('Deletar categoria a pagar:', categoria);
    // Implementar lógica de deletar
  };

  const handleDeletarAReceber = (categoria: Categoria) => {
    console.log('Deletar categoria a receber:', categoria);
    // Implementar lógica de deletar
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="w-full space-y-6">
     

      {/* Tabelas usando o componente */}
      <div className="space-y-8">
        
        {/* Categorias a Pagar */}
        <TabelaPersonalizada
          categorias={categoriasAPagar}
          loading={loadingSpiner}
          titulo="Categorias a Pagar"
          subtitulo="Gerencie as categorias de despesas"
          corTema="red"
          icone={<FaMoneyBillWave />}
          textoBotaoAdicionar="Nova Categoria a Pagar"
          textoVazio="Nenhuma categoria a pagar cadastrada"
          textoDescricaoVazia="Comece adicionando sua primeira categoria de despesa"
          onAdicionarCategoria={() => setAbrirModalAdicionarAPagar(true)}
          onEditarCategoria={(categoria) => setSelectedCategoriaAPagar(categoria)}
          onDeletarCategoria={handleDeletarAPagar}
          maxHeight="50vh"
          mostrarIndice={true}
        />

        {/* Categorias a Receber */}
        <TabelaPersonalizada
          categorias={categoriasAReceber}
          loading={loadingSpiner}
          titulo="Categorias a Receber"
          subtitulo="Gerencie as categorias de receitas"
          corTema="green"
          icone={<FaHandHoldingUsd />}
          textoBotaoAdicionar="Nova Categoria a Receber"
          textoVazio="Nenhuma categoria a receber cadastrada"
          textoDescricaoVazia="Comece adicionando sua primeira categoria de receita"
          onAdicionarCategoria={() => setAbrirModalAdicionarAReceber(true)}
          onEditarCategoria={(categoria) => setSelectedCategoriaAReceber(categoria)}
          onDeletarCategoria={handleDeletarAReceber}
          maxHeight="50vh"
          mostrarIndice={true}
        />
        
      </div>
      

    </div>
  );
}

export default CategoriasFinanceiro;