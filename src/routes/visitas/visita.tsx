import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/context/AuthContext";
import { TituloPagina } from "@components/comum/Textos";
import { Button } from "@src/components/comum/button";
import { adicionarRegistro } from "@src/services/Crud";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import DefaultLayout from "@src/layouts/DefaultLayout";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [result, setResult] = useState<string | null>(null);
  const [leitorAberto, setLeitorAberto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enviando, setEnviando] = useState(false);


  useEffect(() => {
  if (!result || enviando) return;

  const enviarRegistro = async () => {
    setEnviando(true);
    setIsLoading(true);

    try {
      const id_condominio = parseInt(result, 10);
      if (isNaN(id_condominio)) {
        console.error("QR Code inválido");
        return;
      }

      await adicionarRegistro({
        endpoint: "/condominios/visitas/Create.php",
        data: { id_condominio },
        setRelistar: () => setLeitorAberto(false),
        setAbrirModalNovoRegistro: () => {},
        setLoadingSpiner: () => {},
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setResult(null);
      setEnviando(false);
    }
  };

  enviarRegistro();
}, [result, enviando]);

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
                if (!!res) {
                  setResult(res.getText());
                }
                if (!!error) {
                //   console.error(error);
                console.clear();
                }
              }}
              constraints={{ facingMode: "environment" }} // câmera traseira
            />

            
          </div>
        )}

    
      </DefaultLayout>
    </>
  );
}
