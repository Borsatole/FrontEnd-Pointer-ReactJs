import React, { useState } from "react";
import { Input } from "./input";
import { BiSearch } from "react-icons/bi";
import SelectCondominio from "./selectCondominio";
import Modal from "../modal/Modal";

interface InpuSelecionarCondominioProps {
  condominio: any;
  setCondominio: (condominio: any) => void;
  listaDeCondominios?: any[]; // Nome exato do seu exemplo
}

function InpuSelecionarCondominio({
  condominio,
  setCondominio,
  listaDeCondominios,
}: InpuSelecionarCondominioProps) {
  const [abrirSelecao, setAbrirSelecao] = useState(false);

  function fecharModal() {
    setAbrirSelecao(false);
  }

  return (
    <>
      <div className="relative flex items-center w-full group">
        <Input
          type="text"
          name="condominio"
          id="condominio"
          value={condominio?.nome || "Clique na lupa para buscar..."}
          disabled
          className="w-full pr-12 font-medium disabled:opacity-90"
        />
        <button
          type="button"
          onClick={() => setAbrirSelecao(true)}
          title="Buscar Condomínio"
          className="absolute right-1 top-1 bottom-1 px-3 flex items-center justify-center bg-[var(--corPrincipal)] hover:bg-opacity-90 text-white rounded-md transition-all duration-200 shadow-sm cursor-pointer"
        >
          <BiSearch size={18} />
        </button>
      </div>

      {abrirSelecao && (
        <Modal
          IsOpen={true}
          onClose={fecharModal}
          title="Selecione o Condomínio"
          className="min-h-auto"
        >
          <SelectCondominio
            listaDeCondominios={listaDeCondominios}
            setAbrirSelecao={setAbrirSelecao}
            setSelectedCondominio={setCondominio}
            selectedCondominio={condominio}
          />
        </Modal>
      )}
    </>
  );
}

export default InpuSelecionarCondominio;
