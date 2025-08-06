import { useMenu } from "../../context/MenuContext";
import "./MenuLateral.css";
import AbrirMenuIcon from "./Icones/AbrirMenu";
import FecharMenuIcon from "./Icones/FecharMenu";


interface BtnAbrirMenuLateralProps {
  abrirMenu?: () => void;
  fecharMenu?: () => void;
  menuAberto?: boolean;

}

export function BtnAbrirMenuLateral(props: BtnAbrirMenuLateralProps) {
  const { abrirMenu } = useMenu();
  return (
    <div id="botao-abrir-menu">
      <button
        onClick={abrirMenu}
        className="flex transition-all cursor-pointer"
       style={{ 
        color: "var(--text-color)",

        }}>
        <AbrirMenuIcon />
      </button>
    </div>
  );
}

interface BtnFecharMenuLateralProps {
  funcao: () => void;
}

export function BtnFecharMenuLateral({ funcao = () => {} }) {
  return (
    <button
      id="botao-fechar-menu"
      onClick={() => funcao()}
      className="absolute right-4 top-4 p-2  rounded-lg transition-all cursor-pointer"
    >
      <FecharMenuIcon />
    </button>
  );
}

