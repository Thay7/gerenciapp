const { db, chaveSecreta } = require('../db');

const relatoriosController = {
  //Vendas
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
      let query;

      if (mes != null) {
        query = `SELECT * FROM vendas 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        ORDER BY data_hora ASC`
      }
      else {
        query = `SELECT * FROM vendas 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        ORDER BY data_hora ASC`
      }

      const [rows, fields] = await db.query(query, [ano, numeroMes]);

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
      let query;

      if (mes != null) {
        query = `
        SELECT iv.nome, COUNT(*) AS quantidade
        FROM vendas v
        INNER JOIN itens_venda iv on v.id = iv.id_venda
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        GROUP BY iv.nome
        ORDER BY quantidade DESC`
      }
      else {
        query = `
        SELECT iv.nome, COUNT(*) AS quantidade
        FROM vendas v
        INNER JOIN itens_venda iv on v.id = iv.id_venda
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        GROUP BY iv.nome
        ORDER BY quantidade DESC`
      }

      const [rows, fields] = await db.query(query, [ano, numeroMes]);

      res.json({ itemMaisVendido: rows[0].nome, itens: rows });
    } catch (error) {
      res.status(500).send('Erro ao listar dados');
    }
  },
  //Pedidos compra
  async listarAnosDisponiveisPedidosCompra(req, res) {
    try {
      const [rows, fields] = await db.query(`SELECT DISTINCT YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) AS Ano FROM pedidos_compra`);
      const anos = rows.map(row => row.Ano);
      res.json(anos);
    } catch (error) {
      res.status(500).send('Erro ao listar anos');
    }
  },
  async listarMesesDisponiveisPedidosCompra(req, res) {
    try {
      const [rows, fields] = await db.query(`SELECT DISTINCT MONTHNAME(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) AS Mes FROM pedidos_compra`);
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
  async listarDadosRelatorioHistoricoPedidosCompra(req, res) {
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
      let query;

      if (mes != null) {
        query = `
        SELECT *
        FROM pedidos_compra p
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        ORDER BY data_hora DESC`
      }
      else {
        query = `
        SELECT *
        FROM pedidos_compra p
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        ORDER BY data_hora DESC`
      }

      const [rows, fields] = await db.query(query, [ano, numeroMes]);

      let valorTotal = 0;
      rows.forEach(row => {
        valorTotal += row.valor_total;
      });

      res.json({ valor: valorTotal, dados: rows });
    } catch (error) {
      res.status(500).send('Erro ao listar dados');
    }
  },
  async listarDadosRelatorioComprasFornecedor(req, res) {
    try {
      const { idFornecedor } = req.body;

      const [rows, fields] = await db.query(`
        SELECT * FROM pedidos_compra p
        INNER JOIN fornecedores f on p.id_fornecedor = f.id
        WHERE f.id = ?
        ORDER BY data_hora DESC`, [idFornecedor]);

      res.json(rows);
    } catch (error) {
      res.status(500).send('Erro ao listar dados');
    }
  },
  async listarDadosRelatorioConsolidado(req, res) {
    try {
      const { ano, mes } = req.body;
      const mesesNumeros = {
        Janeiro: 1, Fevereiro: 2, Março: 3, Abril: 4, Maio: 5, Junho: 6,
        Julho: 7, Agosto: 8, Setembro: 9, Outubro: 10, Novembro: 11, Dezembro: 12
      };

      const numeroMes = mesesNumeros[mes];

      if (mes != null) {
        queryVendas = `SELECT * FROM vendas 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        ORDER BY data_hora ASC`
      }
      else {
        queryVendas = `SELECT * FROM vendas 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        ORDER BY data_hora ASC`
      }

      const [rowsVendas] = await db.query(queryVendas, [ano, numeroMes]);

      let querySaidasCaixa;

      if (mes != null) {
        querySaidasCaixa = `SELECT * FROM movimento_caixa 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        ORDER BY data_hora ASC`
      }
      else {
        querySaidasCaixa = `SELECT * FROM movimento_caixa 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        ORDER BY data_hora ASC`
      }
      const [rowsSaidasCaixa] = await db.query(querySaidasCaixa, [ano, numeroMes]);

      let queryPedidosCompra;

      if (mes != null) {
        queryPedidosCompra = `SELECT * FROM pedidos_compra 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        AND MONTH(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ?
        ORDER BY data_hora ASC`
      }
      else {
        queryPedidosCompra = `SELECT * FROM pedidos_compra 
        WHERE YEAR(STR_TO_DATE(data_hora, '%d/%m/%Y %H:%i:%s')) = ? 
        ORDER BY data_hora ASC`
      }

      const [rowsPedidosCompra] = await db.query(queryPedidosCompra, [ano, numeroMes]);
      let valorTotalVendas = 0;
      rowsVendas.forEach(row => {
        valorTotalVendas += row.valor_total;
      });

      let valorTotalSaidasCaixa = 0;
      rowsSaidasCaixa.forEach(row => {
        valorTotalSaidasCaixa += row.valor;
      });

      let valorTotalPedidosCompra = 0;
      rowsPedidosCompra.forEach(row => {
        valorTotalPedidosCompra += row.valor_total;
      });

      let valorTotalDespesas = 0;
      valorTotalDespesas = valorTotalSaidasCaixa + valorTotalPedidosCompra;

      let valorTotalLucro = 0;
      valorTotalLucro = valorTotalVendas - valorTotalDespesas;

      res.json({ valorTotalVendas, valorTotalSaidasCaixa, valorTotalPedidosCompra, valorTotalDespesas, valorTotalLucro });
    } catch (error) {
      res.status(500).send('Erro ao listar dados');
    }
  },
};

module.exports = relatoriosController;