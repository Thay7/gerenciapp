const { db, chaveSecreta } = require('../db');
const formatterdate = require('../utils/formatterdate');
const formatterbrl = require('../utils/formatterbrl');

const homeController = {
    async listarResumoDia(req, res) {
        try { 
            const dataAtual = formatterdate(new Date());
            const listResumoDia = [
                { label: 'Vendas do dia', value: 0 },
                { label: 'Entrada Caixa', value: 0 },
                { label: 'Saída Caixa', value: 0 },
                { label: 'Produto Mais Vendido', value: "" },
                { label: 'Serviço Mais Vendido', value: "" }
            ];

            //Vendas do dia
            const [rowsVendas] = await db.query(`SELECT COUNT(*) as qtdVendasDia FROM vendas WHERE data_hora like '%${dataAtual}%'`);
            listResumoDia[0].value = rowsVendas[0].qtdVendasDia > 0 ? rowsVendas[0].qtdVendasDia : 0;

            //Entrada caixa (valor total de vendas do dia)
            const [rowsEntradaCaixa] = await db.query(`SELECT SUM(valor_total) as valorEntradaCaixa FROM vendas WHERE data_hora like '%${dataAtual}%'`);
            listResumoDia[1].value = rowsEntradaCaixa[0].valorEntradaCaixa > 0 ? formatterbrl(rowsEntradaCaixa[0].valorEntradaCaixa) : formatterbrl(0);

            //Saída caixa (valor total pago em pedidos compra do dia)
            const [rowsSaidaCaixa] = await db.query(`SELECT SUM(valor_total) as valorSaidaCaixa FROM pedidos_compra WHERE data_hora like '%${dataAtual}%'`);
            listResumoDia[2].value = rowsSaidaCaixa[0].valorSaidaCaixa > 0 ? formatterbrl(rowsSaidaCaixa[0].valorSaidaCaixa) : formatterbrl(0);

            //Produto mais vendido
            const [rowsProdutoMaisVendido] = await db.query(`
            SELECT iv.nome as nome, count(iv.nome) as produtoMaisVendido
                FROM vendas v
                INNER JOIN itens_venda iv on v.id = iv.id_venda
                INNER JOIN itens i on iv.id_item = i.id and i.tipo = 'Produto'
                WHERE data_hora like '%${dataAtual}%'
                GROUP BY iv.nome
                ORDER BY produtoMaisVendido DESC
            LIMIT 1;
            `);
            listResumoDia[3].value = rowsProdutoMaisVendido.length > 0 ? rowsProdutoMaisVendido[0].nome : "";

            //servico mais vendido
            const [rowsServicoMaisVendido] = await db.query(`
            SELECT iv.nome as nome, count(iv.nome) as servicoMaisVendido
                FROM vendas v
                INNER JOIN itens_venda iv on v.id = iv.id_venda
                INNER JOIN itens i on iv.id_item = i.id and i.tipo = 'Servico'
                WHERE data_hora like '%${dataAtual}%'
                GROUP BY iv.nome
                ORDER BY servicoMaisVendido DESC
            LIMIT 1;
            `);
            listResumoDia[4].value = rowsServicoMaisVendido.length > 0 ? rowsServicoMaisVendido[0].nome : "";
            res.status(200).send(listResumoDia);
        } catch (error) {
            res.status(500).send('Erro ao listar itens');
        }
    }
};

module.exports = homeController;