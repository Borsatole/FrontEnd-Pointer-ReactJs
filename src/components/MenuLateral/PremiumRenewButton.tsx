import React, { useState } from 'react';
import { MdWorkspacePremium, MdAutorenew } from 'react-icons/md';
import { Routes, Route, useNavigate } from "react-router-dom";

export default function PremiumRenewButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mt-auto mb-6">
      <hr className="border-white/10 mb-4" />

      <button
        onClick={() => navigate("/renove")}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group cursor-pointer relative w-full overflow-hidden
                   py-3.5 rounded-xl
                   transition-all duration-300 ease-out
                   hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* Fundo gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Brilho animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                        -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Borda com gradiente */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/50 via-amber-500/50 to-orange-500/50 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        
        {/* Borda sólida */}
        <div className="absolute inset-0 rounded-xl border border-white/10 
                        group-hover:border-yellow-500/50 transition-colors duration-300" />

        {/* Conteúdo do botão */}
        <div className="relative flex items-center justify-center gap-2.5">
          {/* Ícone premium */}
          <div className="relative">
            <MdWorkspacePremium 
              className={`text-2xl text-yellow-400 transition-all duration-300
                         ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}
            />
            {isHovered && (
              <div className="absolute inset-0 text-yellow-400 animate-ping opacity-75">
                <MdWorkspacePremium className="text-2xl" />
              </div>
            )}
          </div>

          {/* Texto */}
          <span className="font-semibold text-[var(--sidebar-text-color)] 
                           group-hover:text-yellow-400 transition-colors duration-300
                           tracking-wide">
            Renovar Assinatura
          </span>

          {/* Ícone de renovação */}
          <MdAutorenew 
            className={`text-xl text-yellow-400/70 transition-all duration-500
                       ${isHovered ? 'rotate-180 opacity-100' : 'rotate-0 opacity-60'}`}
          />
        </div>

        {/* Partículas de brilho (opcional) */}
        {isHovered && (
          <>
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping" 
                 style={{ animationDelay: '0ms' }} />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-400 rounded-full animate-ping" 
                 style={{ animationDelay: '150ms' }} />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-ping" 
                 style={{ animationDelay: '300ms' }} />
          </>
        )}
      </button>

      {/* Texto informativo opcional */}
      <p className="text-xs text-center text-white/40 mt-2 font-medium">
        Mantenha sua assinatura ativa.
      </p>
    </div>
  );
}