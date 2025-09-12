import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/context/AuthContext";
import { TituloPagina } from "@components/comum/Textos";
import { Button } from "@src/components/comum/button";
import { adicionarRegistro } from "@src/services/Crud";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import DefaultLayout from "@src/layouts/DefaultLayout";
import { Alert } from "flowbite-react";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [result, setResult] = useState<string | null>(null);
  const [leitorAberto, setLeitorAberto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [ultimoQrCode, setUltimoQrCode] = useState<string | null>(null);
  const [ultimoEnvio, setUltimoEnvio] = useState<number>(0);

  useEffect(() => {
    if (!result || enviando) return;

    // Proteção adicional no frontend
    const agora = Date.now();
    if (result === ultimoQrCode && (agora - ultimoEnvio) < 3000) {
      console.log("Requisição duplicada ignorada no frontend");
      setResult(null);
      return;
    }

    const enviarRegistro = async () => {
      setEnviando(true);
      setIsLoading(true);
      setUltimoQrCode(result);
      setUltimoEnvio(Date.now());

      try {
        const id_condominio = parseInt(result, 10);
        if (isNaN(id_condominio)) {
          alert("QR Code inválido");
          return;
        }

        await adicionarRegistro({
          endpoint: "/condominios/visitas/Create.php",
          data: { id_condominio },
          setRelistar: () => setLeitorAberto(false),
          setAbrirModalNovoRegistro: () => {},
          setLoadingSpiner: () => {},
        });

        setTimeout(() => {
          setResult(null);
        }, 2000);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setEnviando(false);
      }
    };

    enviarRegistro();
  }, [result, enviando, ultimoQrCode, ultimoEnvio]);

  return (
    <>
      <DefaultLayout>
        <TituloPagina>Visita</TituloPagina>

        <Button onClick={() => setLeitorAberto((prev) => !prev)}>
          {leitorAberto ? "Fechar Leitor" : "Abrir Leitor"}
        </Button>

        {leitorAberto && (
          <div className="relative w-full">
            <QrReader
              onResult={(res, error) => {
                if (!!res && !enviando && !result) {
                  const qrText = res.getText();
                  
                  // Proteção contra leituras duplicadas muito próximas
                  const agora = Date.now();
                  if (qrText === ultimoQrCode && (agora - ultimoEnvio) < 3000) {
                    console.log("QR Code duplicado ignorado");
                    return;
                  }
                  
                  setResult(qrText);
                }
                if (!!error) {
                  console.clear();
                }
              }}
              constraints={{ facingMode: "environment" }}
            />
          </div>
        )}
      </DefaultLayout>
    </>
  );
}