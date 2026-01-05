import { useVistorias } from "@src/context/VistoriasContext";
import { usePaginacao } from "@src/hooks/UsePaginacao";
import { Read } from "@src/services/crud2";
import React, { useEffect, useState } from "react";
import { SelectModificado } from "../comum/select";
import BotaoSeletor from "../comum/buttonSelected";
import Alerta from "../comum/alertas";
import { getIcon } from "../icons";
import { Button } from "../comum/button";

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
        {registros.map((item: any) => (
          <>
            <div className="grid grid-cols-1">
              <BotaoSeletor
                key={item.id}
                icon={getIcon("condominios", 25)}
                value={item.id}
                className={item.vistoria === false ? "opacity-30" : ""}
                selectedValue={selectedCondominio}
                onClick={
                  item.vistoria === false
                    ? () => {
                        Alerta(
                          "swal",
                          "error",
                          "Cadastre Itens de Vistoria para esse Condomínio!"
                        );
                      }
                    : setSelectedCondominio
                }
                label={item.nome}
              />
            </div>
          </>
        ))}
      </ul>
    </div>
  );
}

export default SelecionarCondominio;
