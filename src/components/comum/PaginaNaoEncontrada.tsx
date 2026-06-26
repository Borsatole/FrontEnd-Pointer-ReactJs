import React from "react";
import { MdArrowBack, MdSearchOff } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import ContainerCaixa from "./ContainerCaixa";
import { Button } from "./button";

function PaginaNaoEncontrada() {
  const handleVoltar = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <ContainerCaixa>
      <div className="flex flex-col items-center justify-center py-16 px-6 gap-6">
        {/* Ícone com anel decorativo */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-[var(--corPrincipal)]/10 animate-spin" />
          <RiPagesFill className="relative w-12 h-12 text-[var(--corPrincipal)]" />
        </div>

        {/* Código de erro */}
        <div className="text-center space-y-1">
          <p className="text-5xl font-bold text-[var(--corPrincipal)]/70 select-none">
            404
          </p>
          <p className="text-base font-semibold text-[var(--text-color)]">
            Página não encontrada
          </p>
          <p className="text-sm text-gray-400 max-w-xs">
            A página que você tentou acessar não existe ou foi removida.
          </p>
        </div>

        {/* Botão */}
        <Button onClick={handleVoltar} className="flex items-center gap-2 mt-2">
          <MdArrowBack className="w-4 h-4" />
          Voltar para a página anterior
        </Button>
      </div>
    </ContainerCaixa>
  );
}

export default PaginaNaoEncontrada;
