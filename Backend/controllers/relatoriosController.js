const db = require('../db');

const relatoriosController = {
  async listarAnosDisponiveisVenda(req, res) {
    try {
      const [rows, fields] = await db.query(`SELECT DISTINCT YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) AS Ano FROM vendas`);
      const anos = rows.map(row => row.Ano);
      res.json(anos);
    } catch (error) {
      res.status(500).send('Erro ao listar anos');
    }
  },
  async listarMesesDisponiveisVenda(req, res) {
    try {
      const [rows, fields] = await db.query(`SELECT DISTINCT MONTHNAME(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) AS Mes FROM vendas`);
      const meses = rows.map(row => row.Mes);

      const mesesEmPortugues = meses.map(mes => {
        const mesesTraduzidos = {
          January: 'Janeiro',
          February: 'Fevereiro',
          March: 'Março',
          April: 'Abril',
          May: 'Maio',
          June: 'Junho',
          July: 'Julho',
          August: 'Agosto',
          September: 'Setembro',
          October: 'Outubro',
          November: 'Novembro',
          December: 'Dezembro',
        };
        return mesesTraduzidos[mes] || mes;
      });

      res.json(mesesEmPortugues);
    } catch (error) {
      res.status(500).send('Erro ao listar meses');
    }
  },
  async listarDadosRelatorioVendasMesAno(req, res) {
    try {
      const { ano, mes } = req.body;

      const mesesNumeros = {
        Janeiro: 1,
        Fevereiro: 2,
        Março: 3,
        Abril: 4,
        Maio: 5,
        Junho: 6,
        Julho: 7,
        Agosto: 8,
        Setembro: 9,
        Outubro: 10,
        Novembro: 11,
        Dezembro: 12,
      };

      const numeroMes = mesesNumeros[mes];

      const [rows, fields] = await db.query(`
      SELECT * 
      FROM vendas 
      WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
      AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
      ORDER BY data_hora DESC`, [ano, numeroMes]);

      let valorTotalVendas = 0;
      rows.forEach(row => {
        valorTotalVendas += row.valor_total;
      });

      res.json({ totalVendas: valorTotalVendas, vendas: rows });
    } catch (error) {
      res.status(500).send('Erro ao listar dados');
    }
  },
  async listarDadosRelatorioItensMaisVendidos(req, res) {
    try {
      const { ano, mes } = req.body;

      const mesesNumeros = {
        Janeiro: 1,
        Fevereiro: 2,
        Março: 3,
        Abril: 4,
        Maio: 5,
        Junho: 6,
        Julho: 7,
        Agosto: 8,
        Setembro: 9,
        Outubro: 10,
        Novembro: 11,
        Dezembro: 12,
      };

      const numeroMes = mesesNumeros[mes];

      const [rows, fields] = await db.query(
        `SELECT iv.nome, COUNT(*) AS quantidade
        FROM vendas v
        INNER JOIN itens_venda iv on v.id = iv.id_venda
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        GROUP BY iv.nome
        ORDER BY quantidade DESC`,
        [ano, numeroMes]);

      res.json({ itemMaisVendido: rows[0].nome, itens: rows });
    } catch (error) {
      res.status(500).send('Erro ao listar dados');
    }
  }
};

module.exports = relatoriosController;