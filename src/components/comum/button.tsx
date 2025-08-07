
// import Loading from "../Loading";
import Loading from "../../components/loader/Loading";
import Alerta from "./alertas";



interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  wsize?: string;
}
export function Button({
  children,
  type,
  onClick,
  loading,
  wsize,
} : ButtonProps) {
  return (
    <button
      type={type || "button"}
      disabled={loading || false}
      onClick={onClick || (() => {})}
      className={`${wsize || "w-full"} px-4 min-h-10 py-2 mt-2 text-sm font-medium text-white  rounded-md cursor-pointer`}
      style={{
        backgroundColor: "var(--corPrincipal)",
        color: "var(--text-white)",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--corPrincipalHover)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--corPrincipal)")
      }
    >
      {loading ? (
        <div className="flex items-center justify-center max-h-6 scale-65">
          <Loading color="var(--corTexto1)" escala="1" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}


interface ButtonCloseModalProps {
  onClick: () => void;
}

export function ButtonCloseModal({ onClick } : ButtonCloseModalProps) {
  return (
    <button
      onClick={onClick || (() => {})}
      className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

