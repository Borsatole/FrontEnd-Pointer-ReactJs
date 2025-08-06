
interface ContainerProps {
  children: React.ReactNode;
  tipo?: string;
  id?: string;
}
function Container({ children, tipo = "principal" } : ContainerProps) {
  let id = "conteudo";

  // Retorno padrão para qualquer tipo não reconhecido
  if (tipo !== "principal" && tipo !== "secundario") {
    tipo = "principal";
  }

  if (tipo === "principal") {
    return (
      <div className="w-full min-h-screen p-4 md:p-10 " id={id}>
        {children || ""}
      </div>
    );
  }

  if (tipo === "secundario") {
    return (
      <div className="max-w-full mx-auto p-6 shadow-lg rounded-lg">
        {children || ""}
      </div>
    );
  }

  // Retorno de fallback (nunca deve chegar aqui, mas é uma segurança extra)
  return (
    <div className="w-full min-h-screen p-4 md:p-10" id={id}>
      {children || ""}
    </div>
  );
}

export default Container;