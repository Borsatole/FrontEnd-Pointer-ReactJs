import { getIcon } from "@src/components/icons";

interface BtnAcaoProps {
  tipo: "editar" | "deletar" | "adicionar";
  text?: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export function BtnAcao({
  tipo,
  text,
  onClick,
  className = "",
  disabled = false,
}: BtnAcaoProps) {
  const cores = {
    adicionar: "bg-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/80",
    editar: "bg-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/80",
    deletar: "bg-[var(--corPrincipal)] hover:bg-[var(--corPrincipal)]/80",
  };

  const temTexto = !!text;

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`p-2.5 cursor-pointer rounded-lg text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2
        ${cores[tipo]} 
        ${disabled ? "opacity-50 hover:scale-100" : ""}
        ${className}`}
    >
      {getIcon(tipo, 20, "text-white")}
      {temTexto && <span>{text}</span>}
    </button>
  );
}
