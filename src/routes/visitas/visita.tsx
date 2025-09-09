import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/context/AuthContext";
import BarraSuperior from "@components/barraSuperior";
import MenuLateral from "@components/MenuLateral/MenuLateral";
import Container from "@components/comum/container";
import { TituloPagina } from "@components/comum/Textos";
import { Button } from "@src/components/comum/button";
import { adicionarRegistro } from "@src/services/Crud";
import { QrReader } from "@blackbox-vision/react-qr-reader";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [result, setResult] = useState<string | null>(null);
  const [leitorAberto, setLeitorAberto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!result) return;

    const enviarRegistro = async () => {

      setIsLoading(true);
      try {
        // Supõe que o QR code contenha apenas o id_condominio
        const id_condominio = parseInt(result, 10);
        // const id_condominio = 160;
        if (isNaN(id_condominio)) {
          console.error("QR Code inválido");
          return;
        }

        await adicionarRegistro({
        endpoint: "/condominios/visitas/Create",
        data: { id_condominio },
        setRelistar: () => setLeitorAberto(false),
        setAbrirModalNovoRegistro: () => {},
        setLoadingSpiner: () => {}
        });

      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setResult(null); // reseta para poder ler outro QR Code
      }
    };

    enviarRegistro();
  }, [result]);

  return (
    <>
      <BarraSuperior />
      <Container tipo="principal">
        <MenuLateral />
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

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[40vw] h-[50vh] border-9 border-[var(--corPrincipal)] rounded-lg"></div>
    </div>
          </div>
        )}

    
      </Container>
    </>
  );
}
