import { requisicaoGet, requisicaoPost, requisicaoPut } from "@src/services/requisicoes";
import Alerta from "@src/components/comum/alertas";
import dayjs from "dayjs";



export function fecharVisita({id, dataEHora, mensagem}: any) {

    const mensagemFormatada = mensagem === "" ? null : mensagem;

    requisicaoPut(`/visitas/${id}`, {
        saida: dataEHora || dayjs().format('YYYY-MM-DD HH:mm:ss'),
        mensagem: mensagemFormatada
    }).then((resposta) => {
        Alerta('swal', 'success', 'Visita finalizada com sucesso!');
        
    });
}

export async function consultaVisitaAnterior(codigoLido: string) {
  try {
    const res = await requisicaoGet(
      `/visitas?id_condominio=${codigoLido}&order_by=created_at&order_dir=DESC&limit=1`
    );

    return res.data.registros?.[0] ?? null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function visitaEhAberta(visita: any) {

    if (!visita){
        return false;
    }

    if (visita.saida){
        return false;
    }

    return true;

    
}


export function ultimaVisitaEhIgualHoje(visita: any) {

    if (!visita){
        return false;
    }

    return dayjs(visita.entrada).format('DD/MM/YYYY') 
    === dayjs().format('DD/MM/YYYY');
}

export function abrirVisita({id, dataEHora}: any) {
    requisicaoPost(`/visitas`, {
        id_condominio: id,
        entrada: dataEHora || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }).then((resposta) => {
        
        Alerta('swal', 'success', 'Visita criada com sucesso!');
    });
}