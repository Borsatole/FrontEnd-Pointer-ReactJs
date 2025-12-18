import React, { useState } from 'react'
import { MdCheckCircle, MdLogin, MdLogout, MdWarningAmber } from 'react-icons/md';
import { Input, TextArea } from '@src/components/comum/input';
import { Button } from '@src/components/comum/button';
import dayjs from 'dayjs';
import Modal from '@src/components/modal/Modal';
import { fecharVisita } from '@src/components/visitas/Functions';
import { Alert } from 'flowbite-react';

interface ModalVisitaAbertaProps {
    visitaAberta: any;
    abrirModalVisitaAnteriorAberta: any;
    setAbrirModalVisitaAnteriorAberta: any;
}

function ModalVisitaAnteriorAberta({
    visitaAberta,
    abrirModalVisitaAnteriorAberta,
    setAbrirModalVisitaAnteriorAberta,
}: ModalVisitaAbertaProps) {
    const loading = false;

    const [dataEHoraAtual, setDataEHoraAtual] = useState(
            dayjs().format('YYYY-MM-DDTHH:mm:ss')
        );
    const [saida, setSaida] = useState(dataEHoraAtual);

    const [mensagem, setMensagem] = useState('Tudo em conformidade.');

  return (
    <Modal
        IsOpen={abrirModalVisitaAnteriorAberta}
        onClose={() => setAbrirModalVisitaAnteriorAberta(false)}
    >

    <div className="flex w-full flex-col gap-5 p-5">
                        
        {/* Cabeçalho */}
        <Alert color="warning" icon={MdWarningAmber}>
            <span className="font-bold">Visita Anterior Aberta!</span><br/>
            <span className="font-medium">Finalize a visita e deixe uma mensagem.</span>
        </Alert>
    

        {/* Entrada */}
        <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm font-medium ">
            <MdLogin className="text-lg" />
            Entrada
        </label>

        <Input
            id="entrada"
            type="datetime-local"
            value = {dayjs(visitaAberta.entrada).format('YYYY-MM-DDTHH:mm:ss')}
            readOnly
        />
        </div>

        {/* Saída */}
        <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm font-medium ">
            <MdLogout className="text-lg" />
            Saída
        </label>

        <Input
            id="saida"
            type="datetime-local"
            value={saida}
            onChange={(e) => setSaida(e.target.value)}
            />

        <TextArea
            id="mensagem"
            label="Mensagem"
            value={mensagem}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMensagem(e.target.value)}
        />
        </div>



        {/* Botão */}
        <Button
        className="w-full flex items-center justify-center gap-2 text-lg"
        loading={loading}
        onClick={() => {
            fecharVisita({id: visitaAberta.id, dataEHora: saida, mensagem});
            setAbrirModalVisitaAnteriorAberta(false);
        }}
        disabled={loading}
        >
        
            <MdCheckCircle />
            Finalizar visita
            
        </Button>
    
    </div>

    </Modal>
  )
}

export default ModalVisitaAnteriorAberta