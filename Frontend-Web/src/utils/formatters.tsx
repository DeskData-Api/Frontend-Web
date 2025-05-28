// src/utils/formatters.tsx (ou onde você salvou)

export const formatarMes = (valor: string): string => {
    const [ano, mes] = valor.split("-");
    const nomesMeses = [
      "01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"
    ];
  
    const indice = parseInt(mes, 10) - 1;
    return `${nomesMeses[indice]}/${ano}`;
  };
  
export function formatarHorasMinutos(decimalHoras: number): string {
  const horas = Math.floor(decimalHoras);
  const minutos = Math.round((decimalHoras - horas) * 60);
  return `${horas}h ${minutos}min`;
}