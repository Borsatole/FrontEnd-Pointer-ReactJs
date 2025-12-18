import React, { useState } from 'react'
import { MdCheckCircle, MdLogin, MdLogout, MdWarningAmber } from 'react-icons/md';
import { Input, TextArea } from '@src/components/comum/input';
import { Button } from '@src/components/comum/button';
import dayjs from 'dayjs';
import Modal from '@src/components/modal/Modal';
import { FaCheck } from 'react-icons/fa';
import { FormGroup } from '../comum/FormGroup';
import { fecharVisita } from './Functions';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface ModalVisitaAbertaProps {
    visitaAberta: any;
    abrirModalFinalizacaoVisita: any;
    setAbrirModalFinalizacaoVisita: any;
}

function ModalFinalizacaoVisita({
    visitaAberta,
    abrirModalFinalizacaoVisita,
    setAbrirModalFinalizacaoVisita,
}: ModalVisitaAbertaProps) {
    const loading = false;

    const [dataEHoraAtual, setDataEHoraAtual] = useState(
            dayjs().format('YYYY-MM-DDTHH:mm:ss')
        );
    const [saida, setSaida] = useState(dataEHoraAtual);

    const [mensagem, setMensagem] = useState('Tudo em conformidade.');

    console.log("ModalFinalizacaoVisita aberto")

  return (
    <Modal
        IsOpen={abrirModalFinalizacaoVisita}
        onClose={() => setAbrirModalFinalizacaoVisita(false)}
    >

    <div className="flex flex-col w-full gap-5 p-5">

        <Alert icon={FaCheck} className='' style={{
            backgroundColor: "var(--corPrincipal)",
            color: "white"
        }}>
            <span className="font-bold">Finalização de visita!</span><br/>
            <span className="font-medium">Finalize a visita e deixe uma mensagem.</span>
        </Alert>

                    <div className='flex gap-3'>
                        <span>
                            Entrada:
                        </span>

                        <span>
                            {dayjs(visitaAberta.entrada).format('HH:mm')}
                        </span>
                        
                        
                    </div>

                    <FormGroup label="Mensagem" id="mensagem">
                            <TextArea
                                id="mensagem"
                                placeholder='Descreva em poucas palavras sua visita.'
                                value={mensagem}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMensagem(e.target.value)}
                            />
                    </FormGroup>

  
                    <Button
                    className="w-full flex items-center justify-center gap-2 text-lg"
                    loading={loading}
                    onClick={() => {
                        fecharVisita({id: visitaAberta.id, dataEHora: saida, mensagem});
                        setAbrirModalFinalizacaoVisita(false);
                        // fecharVisita({id: visitaAberta.id, dataEHora: saida, mensagem});
                        // setVisitaAberta(null);
                        // setAbrirModal(false);
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

export default ModalFinalizacaoVisita