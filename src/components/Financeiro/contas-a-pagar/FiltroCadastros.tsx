import { useState, useEffect } from "react";
import { FormGroup } from "@components/comum/FormGroup";
import { Input } from "@components/comum/input";
import { SelectModificado } from "@components/comum/select";
import { requisicaoGet } from "@services/requisicoes";
import { Categoria } from "./tipos";

interface FiltroProps {
  onFiltrar: (queryString: string) => void;
}

export function FiltroCadastros({ onFiltrar }: FiltroProps) {
  const [filtros, setFiltros] = useState({
    id: "",
    nome: "",
    categoria: "",
    data_minima: "",
    data_maxima: "",
  });

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltrar = () => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value.trim() !== "") params.append(key, value);
    });
    onFiltrar(params.toString());
  };

  const handleLimpar = () => {
    setFiltros({ id: "", nome: "", categoria: "", data_minima: "", data_maxima: "" });
    onFiltrar("");
  };

  useEffect(() => {
    requisicaoGet('/Financeiro/categorias/Read.php').then((res) => {
      console.log(res);
      if (res?.data.success) setCategorias(res.data.Registros);
    });
  }, []);

  return (
    <form className="flex flex-col bg-[var(--base-variant)] rounded-lg p-3.5 mt-3.5 mb-5.5" onSubmit={(e) => e.preventDefault()}>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
        
        <FormGroup id="data_minima" label="DATA MINIMA">
          <Input type="date" id="data_minima" name="data_minima" value={filtros.data_minima} onChange={handleChange} />
        </FormGroup>

        <FormGroup id="data_maxima" label="DATA MAXIMA">
          <Input type="date" id="data_maxima" name="data_maxima" value={filtros.data_maxima} onChange={handleChange} />
        </FormGroup>
        <FormGroup id="categoria" label="CATEGORIA">
          <SelectModificado id="categoria" name="categoria" value={filtros.categoria} onChange={handleChange}>
            <option value="">Todos</option>
            {categorias.map((cat) => <option key={cat.id} value={cat.categoria}>{cat.categoria}</option>)}
            <option value="Sem Categoria">Sem Categoria</option>
          </SelectModificado>
        </FormGroup>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <button onClick={handleFiltrar} className="bg-[var(--corPrincipal)] text-white px-4 py-2 rounded-lg hover:brightness-110">Aplicar Filtros</button>
        <button onClick={handleLimpar} className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:brightness-95">Limpar</button>
      </div>
    </form>
  );
}
