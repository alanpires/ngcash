export const convertedDateService = (startDate:string, endDate: string) => {
    //Convertendo a data informada pelo usuário, pois o TypeORM faz a busca baseado no dia
    // e horário
    const startDateConverted = new Date(startDate);
    const endDateConverted = new Date(endDate)
    
    startDateConverted.setUTCHours(0, 0, 0, 0)
    endDateConverted.setUTCHours(23, 59, 59, 999)

    return {startDateConverted, endDateConverted}
}