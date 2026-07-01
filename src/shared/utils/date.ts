import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 
import relativeTime from 'dayjs/plugin/relativeTime'; 

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

type DateInput = string | number | Date | null | undefined;

export const dateUtils = {
  formatarParaBr(date: DateInput, formato = 'DD/MM/YYYY'): string {
    if (!date) return '';
    const d = dayjs(date);
    return d.isValid() ? d.format(formato) : '';
  },

  formatarParaBrComHora(date: DateInput): string {
    return this.formatarParaBr(date, 'DD/MM/YYYY HH:mm');
  },

  obterDiaSemana(date: DateInput, primeiraLetraMaiuscula = true): string {
    if (!date) return '';
    const d = dayjs(date);
    if (!d.isValid()) return '';
    
    const diaSemana = d.format('dddd');
    if (primeiraLetraMaiuscula) {
      return diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
    }
    return diaSemana;
  },

  isFimDeSemana(date: DateInput): boolean {
    if (!date) return false;
    const d = dayjs(date);
    if (!d.isValid()) return false;
    
    const dia = d.day(); 
    return dia === 0 || dia === 6;
  },

  adicionarDias(date: DateInput, dias: number, formato = 'YYYY-MM-DD'): string {
    if (!date) return '';
    const d = dayjs(date);
    if (!d.isValid() || isNaN(dias)) return '';
    
    return d.add(dias, 'day').format(formato);
  },

  /**
   * 🌟 NOVO MÉTODO
   * Soma uma quantidade de dias mantendo o horário original no formato aceito por inputs compostos
   * @example dateUtils.adicionarDiasComHora("2026-06-19T14:30", 5) -> "2026-06-24T14:30"
   */
  adicionarDiasComHora(date: DateInput, dias: number, formato = 'YYYY-MM-DDTHH:mm'): string {
    if (!date) return '';
    const d = dayjs(date);
    if (!d.isValid() || isNaN(dias)) return '';
    
    return d.add(dias, 'day').format(formato);
  },

  /**
   * 🌟 BÔNUS: Retorna o momento exato de agora formatado para o input composto
   * @example dateUtils.agoraParaInput() -> "2026-06-22T22:45"
   */
  agoraParaInput(): string {
    return dayjs().format('YYYY-MM-DDTHH:mm');
  },

  calcularDiferencaDias(dataInicio: DateInput, dataFim: DateInput): number {
    if (!dataInicio || !dataFim) return 0;
    const inicio = dayjs(dataInicio);
    const fim = dayjs(dataFim);
    if (!inicio.isValid() || !fim.isValid()) return 0;
    
    return fim.diff(inicio, 'day');
  },

  tempoRelativo(date: DateInput): string {
    if (!date) return '';
    const d = dayjs(date);
    return d.isValid() ? d.fromNow() : '';
  },

  estaNoPassado(date: DateInput): boolean {
    if (!date) return false;
    const d = dayjs(date);
    return d.isValid() ? d.isBefore(dayjs(), 'day') : false;
  },

  raw: dayjs
};