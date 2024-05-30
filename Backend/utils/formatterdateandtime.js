 const formatterdateandtime = () => {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    return dataFormatada.replace(',', '');
};

module.exports = formatterdateandtime;
