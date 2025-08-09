import { Spinner } from "flowbite-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  wsize?: string;
  loading?: boolean;
}

export function Button({
  children,
  type = "button",
  onClick,
  loading,
  wsize,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={loading || false}
      onClick={onClick || (() => {})}
      className={`${wsize || "w-full"} px-4 min-h-10 py-2 mt-2 text-sm font-medium text-white rounded-md cursor-pointer`}
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
          <Spinner size="xl" className="fill-[var(--corPrincipalHover)]" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
