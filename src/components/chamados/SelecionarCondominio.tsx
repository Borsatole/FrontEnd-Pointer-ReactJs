import { useVistorias } from "@src/context/VistoriasContext";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { Read } from "@src/services/crud2";
import React, { useEffect, useState } from "react";
import { SelectModificado } from "@src/components/comum/select";
import BotaoSeletor from "@src/components/comum/buttonSelected";
import Alerta from "@src/components/comum/alertas";
import { getIcon } from "@src/components/icons";
import { Button } from "@src/components/comum/button";

interface SelecionarCondominioProps {
  selectedCondominio: any;
  setSelectedCondominio: any;
}
function SelecionarCondominio({
  selectedCondominio,
  setSelectedCondominio,
}: SelecionarCondominioProps) {
  const [registros, setRegistros] = useState<any[]>([]);
  const [relistar, setRelistar] = useState(false);

  useEffect(() => {
    Read({
      endpoint: "/condominios",
      setRegistros,
    });
  }, []);

  return (
    <div>
      <ul>
        <div className="grid grid-cols-1">
          {registros.map((item: any, index) => (
            <BotaoSeletor
              key={index}
              icon={getIcon("condominios", 25)}
              value={item.id}
              selectedValue={selectedCondominio}
              onClick={setSelectedCondominio}
              label={item.nome}
            />
          ))}
        </div>
      </ul>
    </div>
  );
}

export default SelecionarCondominio;
