// TabsCondominio.tsx
import { Card, Badge, TabItem } from "flowbite-react";
import {
  FaClipboardList,
  FaHeadset,
  FaUserCheck
} from "react-icons/fa";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { requisicaoGet } from "@src/services/requisicoes";
import { useParams } from "react-router-dom";

interface VistoriasTabProps {
  loadingSpiner: boolean
  setLoadingSpiner: React.Dispatch<React.SetStateAction<boolean>>
  vistorias: any[];
  setVistorias: React.Dispatch<React.SetStateAction<any[]>>

}

export function VistoriasTab({setLoadingSpiner, vistorias, setVistorias }: VistoriasTabProps) {
    const { id } = useParams();
    // const id = 4;
    const [erro, setErro] = useState<string | null>(null);


    useEffect(() => {
        const buscar = async () => {
          try {
            const res = await requisicaoGet(`/condominios/${id}`);
    
            if (res?.data?.success) {
              console.log(res.data.registro);
              setVistorias(res.data.registro || []);
              
            } else {
              setErro("Não foi possível carregar os dados.");
            }
          } catch (e) {
            setErro("Erro ao conectar ao servidor.");
          }
          setLoadingSpiner(false);
        };
    
        buscar();
      }, [id]);

    
  return (
    <></>
    //   <div className="space-y-4 py-4">
    //     {vistorias.length === 0 ? (
    //       <div className="text-center py-12">
    //         <FaClipboardList className="text-5xl mx-auto mb-4 text-gray-400" />
    //         <p>Nenhuma vistoria registrada ainda.</p>
    //       </div>
    //     ) : (
    //       vistorias.map((vistoria, index) => (
    //         <Card key={index} className="hover:shadow-md transition-shadow">
    //           <div className="flex justify-between items-start">
    //             <div>
    //               <h3 className="font-semibold text-lg">{vistoria.titulo}</h3>
    //               <p className="text-sm text-gray-600 mt-1">{vistoria.descricao}</p>
    //               <p className="text-xs text-gray-400 mt-2">
    //                 Data: {dayjs(vistoria.data).format("DD/MM/YYYY HH:mm")}
    //               </p>
    //             </div>

    //             <Badge color={vistoria.status === "concluida" ? "success" : "warning"}>
    //               {vistoria.status}
    //             </Badge>
    //           </div>
    //         </Card>
    //       ))
    //     )}
    //   </div>
  );
}

export function ChamadosTab({ chamados }: { chamados: any[] }) {
  return (
      <div className="space-y-4 py-4">
        {chamados.length === 0 ? (
          <div className="text-center py-12">
            <FaHeadset className="text-5xl mx-auto mb-4 text-gray-400" />
            <p>Nenhum chamado registrado ainda.</p>
          </div>
        ) : (
          chamados.map((chamado, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{chamado.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">{chamado.descricao}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Aberto em: {dayjs(chamado.data).format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>

                <Badge color={chamado.status === "resolvido" ? "success" : "failure"}>
                  {chamado.status}
                </Badge>
              </div>
            </Card>
          ))
        )}
      </div>
  );
}

export function VisitasTab({ visitas }: { visitas: any[] }) {
  return (
      <div className="space-y-4 py-4">
        {visitas.length === 0 ? (
          <div className="text-center py-12">
            <FaUserCheck className="text-5xl mx-auto mb-4 text-gray-400" />
            <p>Nenhuma visita registrada ainda.</p>
          </div>
        ) : (
          visitas.map((visita, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{visita.visitante}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Motivo: {visita.motivo}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Data: {dayjs(visita.data).format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>

                <Badge color="info">{visita.tipo}</Badge>
              </div>
            </Card>
          ))
        )}
      </div>
  );
}
