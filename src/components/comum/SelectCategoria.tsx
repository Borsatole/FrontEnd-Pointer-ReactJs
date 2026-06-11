import { categoriasService } from "@src/services/modules/financeiro/categoriasService";
import React, { useEffect, useState } from "react";
import { SelectAtualizado } from "./SelectAtualizado";

export interface Categoria {
  id: string | number;
  categoria_item: string;
  [key: string]: any;
}

type Props = {
  selectedCategoria: string | number | null | undefined;
  onSelect: (id: string | number) => void;
  tipo: "Entrada" | "Saida";
  categorias?: any[]; // Opcional para o modo híbrido funcionar
};

function SelectCategoria({
  selectedCategoria,
  onSelect,
  tipo,
  categorias: categoriasProp,
}: Props) {
  const [listaCategorias, setListaCategorias] = useState<Categoria[]>(
    categoriasProp || [],
  );

  // Efeito 1: Sincroniza se a lista externa injetada no Pai mudar/carregar
  useEffect(() => {
    if (categoriasProp && categoriasProp.length > 0) {
      setListaCategorias(categoriasProp);
    }
  }, [categoriasProp]);

  // Efeito 2: COMPORTAMENTO HÍBRIDO - Só busca se a prop externa vier vazia
  useEffect(() => {
    const temListaExterna = categoriasProp && categoriasProp.length > 0;

    if (!temListaExterna) {
      categoriasService
        .listar({ tipo: tipo.toLowerCase() })
        .then((res: any) => {
          if (res && Array.isArray(res.registros)) {
            setListaCategorias(res.registros);
          } else {
            setListaCategorias([]);
          }
        });
    }
  }, [tipo, categoriasProp]);

  return (
    <SelectAtualizado
      name="id_categoria"
      id="id_categoria"
      labelKey="categoria_item"
      valueKey="id"
      options={listaCategorias}
      value={selectedCategoria || ""}
      onChange={(e: any) => {
        const valor = e.target?.value ?? e;
        onSelect(valor);
      }}
    />
  );
}

export default SelectCategoria;
