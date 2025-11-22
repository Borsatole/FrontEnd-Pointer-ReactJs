import React from "react";
import dayjs from "dayjs";

interface DiasSemanaCardsProps {
  dias: { data: dayjs.Dayjs; dia: number; mes: number; ano: number; diaSemana: string }[];
  selecionado: { data: dayjs.Dayjs; dia: number; mes: number; ano: number; diaSemana: string };
  setSelecionado: (dia: { data: dayjs.Dayjs; dia: number; mes: number; ano: number; diaSemana: string }) => void;
}

export default function DiasSemanaCards({ dias, selecionado, setSelecionado }: DiasSemanaCardsProps) {
   

        return (
    <div className="flex gap-3 overflow-x-hidden py-3 px-1 w-full">
      {dias.map((d, i) => {
        const isSelecionado = d.data.isSame(selecionado.data, 'day');
        const isHoje = d.data.isSame(dayjs(), 'day');

        return (
          <div
            key={i}
            onClick={() => setSelecionado(d)}
            className={`cursor-pointer flex-1 min-w-[80px] h-40 flex flex-col items-center justify-center rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105
              ${isSelecionado 
                ? " bg-[var(--corPrincipal)] text-white" 
                : isHoje
                ? "bg-[var(--corPrincipal)/50] text-gray-800 border-2 border-[var(--corPrincipal)]"
                : "bg-white text-gray-700 border border-gray-200 hover:border-[var(--corPrincipal)]  hover:text-white"
              }`}
          >
            <span className={`font-bold text-2xl mb-1 ${isSelecionado ? "text-white" : "text-gray-800"}`}>
              {d.dia}
            </span>
            <span className={`text-xs uppercase tracking-wide ${isSelecionado ? "text-blue-100" : "text-gray-500"}`}>
              {d.diaSemana.substring(0, 3)}
            </span>
            {isHoje && !isSelecionado && (
              <span className="text-[10px] mt-1 text-[var(--corPrincipal)] font-semibold">Hoje</span>
            )}
          </div>
        );
      })}
    </div>
  );
    
}
