import { useState } from "react";
import { FormGroup } from "@components/comum/FormGroup";
import { Input } from "@components/comum/input";
import { SelectModificado } from "@components/comum/select";
import { useEffect } from "react";
import { requisicaoGet } from "@services/requisicoes";
import { Categoria } from "@src/components/tipos";

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  categoria: string;
  created_at?: string;
  updated_at?: string;
}

interface FiltroProps {
  onFiltrar: (queryString: string) => void;
}

export function FiltroCadastros({ onFiltrar }: FiltroProps) {
  const [filtros, setFiltros] = useState({
    id: "",
    nome: "",
    quantidade: "",
    categoria: "",
  });

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltrar = () => {
    const queryString = Object.entries(filtros)
      .filter(([_, valor]) => valor.trim() !== "")
      .map(([chave, valor]) => `${encodeURIComponent(chave)}=${encodeURIComponent(valor)}`)
      .join("&");

    onFiltrar(queryString);
  };

  const handleLimpar = () => {
    setFiltros({
      id: "",
      nome: "",
      quantidade: "",
      categoria: "",
    });
    onFiltrar("");
  };


    
  
    useEffect(() => {
      requisicaoGet('/Estoque/estoque.php').then((response) => {
        if (response?.data.success) {
          setProdutos(response.data.cadastros);
        }
      });

      requisicaoGet('/Estoque/categoria/categorias.php').then((response) => {
        if (response?.data.success) {
          setCategorias(response.data.categorias);
        }
      });
    }, []);

  return (
    <>
    <form className="flex flex-col bg-[var(--base-variant)] rounded-lg p-3.5 mt-3.5 mb-5.5" onSubmit={(e) => e.preventDefault()}>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4  p-4">
        <FormGroup id="id" label="ID">
          <Input
            id="id"
            name="id"
            type="text"
            value={filtros.id}
            placeholder=""
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup id="nome" label="Nome">
          <Input
            id="nome"
            name="nome"
            type="text"
            value={filtros.nome}
            placeholder=""
            onChange={handleChange}
          />
        </FormGroup>

        

      
        <FormGroup id="quantidade" label="Qtd">
          <Input
            id="quantidade"
            name="quantidade"
            type="text"
            value={filtros.quantidade}
            placeholder=""
            onChange={handleChange}
          />
        
        </FormGroup>

        <FormGroup id="categoria" label="categoria">
          
          <SelectModificado
          id="categoria"
          name="categoria"
          value={filtros.categoria}
          onChange={handleChange}
        >
          <option value="">Todos</option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.nome}>
              {categoria.nome}
            </option>
          ))}

          <option value="Sem Categoria">Sem Categoria</option>
        </SelectModificado>
        </FormGroup>

        
      </div>

      <div className="mt-4 flex gap-2 justify-end ">
        <button
          onClick={handleFiltrar}
          className="bg-[var(--corPrincipal)] text-white px-4 py-2 rounded-lg hover:brightness-110 transition"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleLimpar}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:brightness-95 transition"
        >
          Limpar
        </button>
      </div>

      </form>
    </>
  );
}
