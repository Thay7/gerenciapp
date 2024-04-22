const formatterdate = () => {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const anoAtual = dataAtual.getFullYear();

    const dataFormatada = `${diaAtual}/${mesAtual}/${anoAtual}`;
    return dataFormatada;
};

module.exports = formatterdate;
