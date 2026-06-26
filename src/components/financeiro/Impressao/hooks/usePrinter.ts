import { Condominio } from "@src/components/tipos";
import { condominioService } from "@src/services/modules/condominios/condominioService";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { validarPrinter } from "../validacao";
import { FinanceiroViewService } from "@src/services/modules/financeiro/financeirtoViewsService";
import Alerta from "@src/components/comum/alertas";
import { gerarPdfFinanceiro } from "./useGerarPdf";

type FormDataPrinter = {
  condominio: Condominio | null;
  data_inicial: string;
  data_final: string;
};



export function usePrinter() {
    const [condominios, setCondominios] = useState<Condominio[]>([]);
    const [data, setData] = useState<FormDataPrinter>({
        condominio: null,
        data_inicial: dayjs().startOf("month").format("YYYY-MM-DD"),
        data_final: dayjs().endOf("month").format("YYYY-MM-DD"),
    });

    useEffect(() => {
        condominioService
          .listar({})
          .then((dados) => setCondominios(dados.registros || []))
          .catch(console.error);
      }, []);

      const setField = (field: keyof typeof data, value: any) =>
        setData((prev) => ({ ...prev, [field]: value }));


    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const erro = validarPrinter(data);

    if (erro) {
        alert(erro);
        return;
    }


    const payload = {
        id_condominio: data.condominio!.id!,
        data_minima: data.data_inicial,
        data_maxima: data.data_final,
    };

    try{
        const response = await FinanceiroViewService.gerarRelatorioPdf(payload);

        if(!response.data.success){
            alert(response.data.message);
            return;
        }

        gerarPdfFinanceiro(response.data.registro);
        console.log(response);

        Alerta("toast", "success", response.data.message);
    } catch (error) {
        console.error(error);
    }

    
    }

    return {
        setField,
        condominios,
        setCondominios,
        data,
        handleSubmit
    };
}