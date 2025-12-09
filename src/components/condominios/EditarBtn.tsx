
import { Dropdown, DropdownItem } from "flowbite-react";
import { ItemEstoque } from "@src/components/tipos";
import { Delete } from "@src/services/crud2";
import { useEstoque } from "@src/context/EstoqueContext";

interface EditarBtnProps {
    item: ItemEstoque;
}

export function EditarBtn({item}:EditarBtnProps) {

    const {
            registros, setRegistros,
            relistar, setRelistar,
            loadingSpiner, setLoadingSpiner,
            selectedRegistro, setSelectedRegistro,
            abrirModalNovoRegistro, setAbrirModalNovoRegistro,
            abrirModalEditarRegistro, setAbrirModalEditarRegistro
          } = useEstoque();
    

    const dados = item.dados_locacao && !Array.isArray(item.dados_locacao)
    ? item.dados_locacao
    : null;

    if (!dados) return null;


    function deletarLocacao(idLocacao:number){
        Delete({ 
            endpoint : `/locacoes/${Number(idLocacao) || idLocacao}`, 

            antesDeExecutar : () => {
                setLoadingSpiner(true);
            },
            depoisDeExecutar : () => {
                setLoadingSpiner(false);
                setRelistar(true);
            },
        });
    };

  return (
    <Dropdown inline label="">
          <DropdownItem 
          
          onClick={() => {
                setAbrirModalEditarRegistro(true);
                setSelectedRegistro(item);
              }}

          >
            <a
              
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Editar
            </a>
          </DropdownItem>
          
          <DropdownItem
          onClick={() => deletarLocacao(dados.locacao_id)}
          >
            <a
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Deletar locação
            </a>
          </DropdownItem>
        </Dropdown>
  );
}
