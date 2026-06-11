import { useState, useEffect } from "react";

const mensagens = [
  "Tenha um sistema completo igual a esse",
  "Entre em contato clicando aqui",
  "Desenvolvemos seu sistema sob medida",
  "Faça um orcamento e vamos conversar",
];

function DesenvolvidoPor() {
  const [mensagemIndex, setMensagemIndex] = useState(0);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    if (!mostrarMensagem) return;
    const intervalo = setInterval(() => {
      setVisivel(false);

      setTimeout(() => {
        setMensagemIndex((prev) => (prev + 1) % mensagens.length);
        setVisivel(true);
      }, 400);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [mostrarMensagem]);

  return (
    <>
      <div
        onClick={() => window.open("https://wa.me/5514997172257", "_blank")}
        className="group lex flex-col items-center gap-2 py-4 cursor-pointer w-fit mx-auto"
      >
        {/* Balão de mensagem */}
        {mostrarMensagem && (
          <div
            style={{
              opacity: visivel ? 1 : 0,
              transform: visivel ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
            className="relative bg-[var(--corPrincipal)] text-white border border-gray-200 rounded-2xl rounded-bl-sm
          px-3 py-1.5 shadow-sm group-hover:border-gray-300 group-hover:shadow-md
          transition-shadow duration-300"
          >
            <p className="text-[11px] whitespace-nowrap  transition-colors duration-300">
              {mensagens[mensagemIndex]}
            </p>

            {/* Pontinha do balão */}
            <div
              className="absolute -bottom-[6px] left-4 w-3 h-3 bg-[var(--corPrincipal)] border-r border-b
            border-gray-200 rotate-45 group-hover:border-gray-300 transition-colors duration-300"
            />
          </div>
        )}

        {/* Logo + texto */}
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-light
            transition-colors duration-300 group-hover:text-gray-600"
          >
            desenvolvido por
          </span>

          <div className="w-px h-3 bg-gray-300 group-hover:bg-gray-400 transition-colors duration-300" />

          <img
            src="/group_conect.png"
            width={100}
            alt="Logo do Grupo Conect"
            className="
            grayscale opacity-40
            transition-all duration-500
          "
          />
        </div>
      </div>
    </>
  );
}

export default DesenvolvidoPor;
