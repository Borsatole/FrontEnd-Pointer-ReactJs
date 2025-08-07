import { LinhaTabela, Tabela, CelulaTabela, ButtonEdit, ButtonDelete } from '../../components/comum/tabelas'

function TabelaProdutos() {
  const produtos = [
    { id: 1, nome: "Produto A", quantidade: 10, categoria: "Categoria 1" },
    { id: 2, nome: "Produto B", quantidade: 5, categoria: "Categoria 2" },
    { id: 3, nome: "Produto C", quantidade: 8, categoria: "Categoria 3" }
  ];

  const handleEditar = (id: number) => {
    console.log("Editar produto:", id);
  };

  const handleExcluir = (id: number) => {
    console.log("Excluir produto:", id);
  };

  return (
    <div className="overflow-x-auto">
      <Tabela>
        <thead>
          <LinhaTabela tipo="head" >
            <CelulaTabela tipo="head" >ID</CelulaTabela>
            <CelulaTabela tipo="head" >Nome</CelulaTabela>
            <CelulaTabela tipo="head" >Qtd</CelulaTabela>
            <CelulaTabela tipo="head">Categoria</CelulaTabela>
            <CelulaTabela tipo="head">Ações</CelulaTabela>
          </LinhaTabela>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <LinhaTabela key={produto.id} tipo="body" >
              <CelulaTabela>{produto.id}</CelulaTabela>
              <CelulaTabela>{produto.nome}</CelulaTabela>
              <CelulaTabela>{produto.quantidade}</CelulaTabela>
              <CelulaTabela>{produto.categoria}</CelulaTabela>
              <CelulaTabela>
                <div className="flex gap-2">
                  <ButtonEdit onClick={() => handleEditar(produto.id)} />
                  <ButtonDelete onClick={() => handleExcluir(produto.id)} />
                </div>
              </CelulaTabela>
            </LinhaTabela>
          ))}
        </tbody>
      </Tabela>
    </div>
  );
}

export default TabelaProdutos;
