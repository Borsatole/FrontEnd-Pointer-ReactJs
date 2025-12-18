import Alerta from '@src/components/comum/alertas';
import { abrirVisita, consultaVisitaAnterior, ultimaVisitaEhIgualHoje, visitaEhAberta } from '@src/components/visitas/Functions';
import ModalFinalizacaoVisita from '@src/components/visitas/ModalFinalizacaoVisita';
import ModalVisitaAnteriorAberta from '@src/components/visitas/ModalVisitaAnteriorAberta';
import { requisicaoGet, requisicaoPost } from '@src/services/requisicoes'
import dayjs, { locale } from 'dayjs';
import { useEffect, useState } from 'react';


export default function OpcoesVistias({codigoLido, setAbrirModalOpcoes}:any) {
    locale('pt-br');

    const [loading, setLoading] = useState(true);
    const [visitaAberta, setVisitaAberta] = useState(null as any);

    // Modais
    const [abrirModalVisitaAnteriorAberta, setAbrirModalVisitaAnteriorAberta] = useState(false);
    const [abrirModalFinalizacaoVisita, setAbrirModalFinalizacaoVisita] = useState(false);


    
    
    async function fluxo(codigoLido: string) {
        
        const visitaAnterior = await consultaVisitaAnterior(codigoLido);
        const visita_Aberta = visitaEhAberta(visitaAnterior);
        const ultimaVisitaEIgualHoje = ultimaVisitaEhIgualHoje(visitaAnterior);

        
        // verifica se tem visita aberta de outro dia
        if (visita_Aberta && !ultimaVisitaEIgualHoje) {
            setVisitaAberta(visitaAnterior);
            setAbrirModalVisitaAnteriorAberta(true);
            return;
        }

        // verifica se tem visita aberta de hoje
        if (visita_Aberta) {
            setVisitaAberta(visitaAnterior);
            setAbrirModalFinalizacaoVisita(true);
            return;
        }

        // se nao tem visita aberta de hoje, abre uma nova
        if (!visita_Aberta) {
            abrirVisita({id: codigoLido});
        }

    };

    

    useEffect(() => {
        if (codigoLido){
            fluxo(codigoLido);
        }
        
    }, [codigoLido]);

  return (
    <>
        {abrirModalVisitaAnteriorAberta && <ModalVisitaAnteriorAberta
            visitaAberta={visitaAberta}
            abrirModalVisitaAnteriorAberta={abrirModalVisitaAnteriorAberta}
            setAbrirModalVisitaAnteriorAberta={setAbrirModalVisitaAnteriorAberta}
        />}

        {abrirModalFinalizacaoVisita && <ModalFinalizacaoVisita
            visitaAberta={visitaAberta}
            abrirModalFinalizacaoVisita={abrirModalFinalizacaoVisita}
            setAbrirModalFinalizacaoVisita={setAbrirModalFinalizacaoVisita}
        />}

    </>
  );
}

