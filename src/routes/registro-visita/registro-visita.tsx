import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { MdClose, MdCheckCircle } from "react-icons/md";
import { Button } from "@src/components/comum/button";
import ContainerSecundario from "@src/components/comum/containerSecundario";
import { TituloPagina } from "@components/comum/Textos";
import Modal from "@src/components/modal/Modal";
import OpcoesVistias from "./opcoesVisita";

export default function Dashboard() {
  const [isOpen, setOpen] = useState(false);
  const [abrirModalOpcoes, setAbrirModalOpcoes] = useState(false);
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success">("idle");
  const [scannedData, setScannedData] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const MODO_TESTE = true;
  const CONDOMINIO_TESTE = "1";

  const onScanSuccess = (valor: string) => {
  setScannedData(valor);
  setScanStatus("success");

  setTimeout(() => {
    setOpen(false);
    setScanStatus("idle");
    setAbrirModalOpcoes(true);
  }, 1000);
  };


  useEffect(() => {
  if (MODO_TESTE && isOpen) {
    onScanSuccess(CONDOMINIO_TESTE);
    return;
  }

  // 👉 Produção (scanner real)
  if (!isOpen || !videoRef.current) return;

  

  setScanStatus("scanning");

  scannerRef.current = new QrScanner(
    videoRef.current,
    (result) => onScanSuccess(result.data),
    {
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  );

  scannerRef.current.start();

  return () => {
    scannerRef.current?.stop();
    scannerRef.current?.destroy();
    scannerRef.current = null;
  };
  }, [isOpen]);


  const handleClose = () => {
    setOpen(false);
    setScanStatus("idle");
    setScannedData("");
    
  };

  return (
    <ContainerSecundario>
      <TituloPagina>Registro de Visita</TituloPagina>

      <Button onClick={() => {setOpen(true); setAbrirModalOpcoes(false);}}>Abrir QR Code</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="relative max-w-md w-full">
            {/* Botão Fechar */}
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-110"
              aria-label="Fechar scanner"
            >
              <MdClose className="w-6 h-6 text-white" />
            </button>

            {/* Container do Scanner */}
            <div className="bg-[var(--corPrincipal)] p-6 rounded-3xl shadow-2xl border border-white/20">
              {scanStatus === "success" ? (
                // Feedback de Sucesso
                <div className="aspect-square flex items-center justify-center bg-green-500/20 rounded-2xl border-2 border-green-500/50 animate-in zoom-in duration-500">
                  <div className="text-center">
                    <MdCheckCircle className="w-24 h-24 text-green-400 mx-auto mb-4 animate-bounce" />
                    <p className="text-white text-xl font-bold mb-2">
                      QR Code Lido!
                    </p>
                    <p className="text-white/70 text-sm px-4 break-all">
                      {scannedData}
                    </p>
                  </div>
                </div>
              ) : (
                // Scanner de Vídeo
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--corPrincipal)]">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  
                  {/* Overlay de Scanner */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Escurecimento das bordas */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
                    
                    {/* Frame de Scan - Cantos */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-[var(--corPrincipal)] rounded-tl-2xl animate-pulse"></div>
                    <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-[var(--corPrincipal)] rounded-tr-2xl animate-pulse"></div>
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-[var(--corPrincipal)] rounded-bl-2xl animate-pulse"></div>
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-[var(--corPrincipal)] rounded-br-2xl animate-pulse"></div>
                    
                    {/* Linha de Varredura Animada */}
                    <div className="absolute inset-x-8 h-0.5 bg-gradient-to-r from-transparent border-[var(--corPrincipal)] to-transparent animate-scan"></div>
                    
                    {/* Grid de Referência Sutil */}
                    <div className="absolute inset-8 border-2 border-dashed border-white/20 rounded-2xl"></div>
                  </div>
                </div>
              )}

              {/* Instruções */}
              {scanStatus === "scanning" && (
                <div className="mt-4 text-center animate-in fade-in duration-500">
                  <p className="text-white font-medium text-lg mb-1">
                    Posicione o QR Code no centro
                  </p>
                  <p className="text-white/60 text-sm">
                    A leitura será automática
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {abrirModalOpcoes && (
        <OpcoesVistias 
          codigoLido={scannedData} 
          setAbrirModalOpcoes={setAbrirModalOpcoes} 
        />
        
      )}



      
    </ContainerSecundario>
  );
}