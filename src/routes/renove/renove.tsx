import React from 'react'

function Renove() {
  return <BannerMensalidadeVencida />
}

export default Renove

function BannerMensalidadeVencida() {
  return (
    <div className=" w-full rounded-2xl overflow-hidden p-6 sm:p-8 mb-6 bg-gradient-to-r from-green-500 to-green-600 shadow-lg border-2 border-green-700">

      <div className="relative flex items-start sm:items-center gap-4 sm:gap-6">
        
        {/* Ícone de alerta */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="text-left text-white flex-1">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            Faça a renovação da sua mensalidade
          </h2>

          <p className="text-xs sm:text-sm mt-1 opacity-95">
            Entre em contato conosco via WhatsApp para renovar sua mensalidade.
          </p>
          
          {/* Botão WhatsApp */}
          <a
            href="https://wa.me/14997172257?text=Olá, gostaria de renovar minha mensalidade."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-red-50 transition-colors text-xs sm:text-sm shadow-md"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
