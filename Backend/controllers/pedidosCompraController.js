const db = require('../db'); // Importe a conexão
const formatterdateandtime = require('../utils/formatterdateandtime');

const pedidosCompraController = {
  //Lista os produtos disponiveis para o select
  async listarProdutos(req, res) {
    try {
      const [rows, fields] = await db.query('SELECT * FROM itens WHERE tipo = "Produto"');
      res.json(rows);
      console.log(rows);

    } catch (error) {

      console.error('Erro ao listar produtos:', error);
      res.status(500).send('Erro ao listar itens');
    }
  },
  async listar(req, res) {
    try {
      const [rows, fields] = await db.query(
        `SELECT p.*, ip.id as item_id, i.nome, ip.valor, 
        ip.quantidade, f.cnpj, f.nome_fantasia,
        f.razao_social, f.contato, i.id as id_item
        FROM pedidos_compra p 
        INNER JOIN itens_pedidos_compra ip on ip.id_pedido_compra = p.id 
        INNER JOIN fornecedores f on p.id_fornecedor = f.id
        INNER JOIN itens i on ip.id_item = i.id
        ORDER BY p.id DESC`);
      const pedidosFormatados = rows.reduce((formattedSales, row) => {
        const foundSale = formattedSales.find(sale => sale.numero_pedido_compra === row.numero_pedido_compra);

        if (foundSale) {
          foundSale.itens.push({
            id: row.id_item,
            nome: row.nome,
            valor: row.valor,
            quantidade: row.quantidade
          });
        } else {
          const formattedSale = {
            numero_pedido_compra: row.numero_pedido_compra,
            itens: [
              {
                id: row.id_item,
                nome: row.nome,
                valor: row.valor,
                quantidade: row.quantidade
              }
            ],
            forma_pagamento: row.forma_pagamento,
            numero_parcelas: row.numero_parcelas,
            valor_total: row.valor_total,
            data_hora: row.data_hora,
            recebido: row.recebido,
            cnpj: row.cnpj,
            nome_fantasia: row.nome_fantasia,
            razao_social: row.razao_social,
            contato: row.contato
          };

          formattedSales.push(formattedSale);
        }
        return formattedSales;

      }, []);

      res.json(pedidosFormatados);
    } catch (error) {
      console.error('Erro ao listar vendas: ', error);
      res.status(500).send('Erro ao listar vendas');
    }
  },
  async cadastrar(req, res) {
    try {
      const { fornecedor, forma_pagamento, numero_parcelas, valor_total, data_hora, itens } = req.body;
      const id_fornecedor = fornecedor.id;

      //Adicionado o pedido ao banco
      const insertPedidoCompra = `INSERT INTO pedidos_compra (id_fornecedor, forma_pagamento, numero_parcelas, valor_total, data_hora, recebido)
                     VALUES (?, ?, ?, ?, ?, ?)`
      await db.query(insertPedidoCompra, [id_fornecedor, forma_pagamento, numero_parcelas, valor_total, data_hora, 0]);

      //Recuperando o id do pedido para inserir numero pedido e linkar com os itens 
      const [rows, fields] = await db.query('SELECT ID FROM pedidos_compra ORDER BY ID DESC LIMIT 1');
      const id_pedido = rows[0].ID;

      //Inserindo o número do pedido
      const anoAtual = new Date().getFullYear();
      const numero_venda = `${anoAtual}${id_pedido}`;

      const insertNumeroPedido = `UPDATE pedidos_compra 
                                 SET numero_pedido_compra=?
                                 WHERE id=?`
      await db.query(insertNumeroPedido, [numero_venda, id_pedido]);

      //Iteração sobre o array de itens e inserção no banco de dados
      for (const item of itens) {
        const { nome, valor_compra, quantidade, id } = item;
        const insertItemQuery = `INSERT INTO itens_pedidos_compra (id_pedido_compra, nome, valor, quantidade, id_item)
                                 VALUES (?, ?, ?, ?, ?)`;

        await db.query(insertItemQuery, [id_pedido, nome, valor_compra, quantidade, id]);
      }

      res.status(200).json({ success: true, message: 'Pedido compra cadastrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao cadastrar o pedido' });
    }
  },
  async confirmarRecebimento(req, res) {
    try {
      const { numero_pedido_compra, itens } = req.body;
      const query = `UPDATE pedidos_compra 
                      SET recebido=?
                      WHERE numero_pedido_compra=?`;

      await db.query(query, [1, numero_pedido_compra]);

      //Iteração sobre o array de itens inserindo no estoque
      for (const item of itens) {
        const { id, quantidade } = item;
        const dataHoraAtual = formatterdateandtime(new Date());

        const [rows, fields] = await db.query(`SELECT * FROM estoque WHERE id_produto=?`, [id]);

        if (rows.length > 0) {
          const novaQuantidade = rows[0].quantidade + quantidade;
          const updateItemEstoque = `
            UPDATE estoque 
            SET quantidade=?,
            data_hora=?
            WHERE id_produto=?`;

          await db.query(updateItemEstoque, [novaQuantidade, dataHoraAtual, id]);
        }
        else {
          const insertItemQuery = `INSERT INTO estoque (id_produto, quantidade, data_hora)
          VALUES (?, ?, ?)`;
          await db.query(insertItemQuery, [id, quantidade, dataHoraAtual]);
        };
      }
      res.status(200).json({ success: true, message: 'Pedido compra recebido com sucesso!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao editar o produto' });
    }
  },
  async editar(req, res) {
    try {
      const { fornecedor, forma_pagamento, numero_parcelas, valor_total, data_hora, itens } = req.body;
      const { numero_pedido_compra } = req.params;
      console.log(numero_pedido_compra)
      const updatePedido = `UPDATE pedidos_compra 
                      SET forma_pagamento=?, numero_parcelas=?, valor_total=?, data_hora=?
                      WHERE numero_pedido_compra=?`;
      await db.query(updatePedido, [forma_pagamento, numero_parcelas, valor_total, data_hora, numero_pedido_compra]);

      //Atualizando os itens da venda
      for (const item of itens) {
        const { nome, valor, quantidade, id } = item;
        const insertItemQuery = `UPDATE itens_pedidos_compra 
                                 SET nome=?,
                                 valor=?,
                                 quantidade=?
                                 WHERE id=?`;

        await db.query(insertItemQuery, [nome, valor, quantidade, id]);
      }
      res.status(200).json({ success: true, message: 'Pedido compra editado com sucesso!' });
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao editar o pedido compra' });
    }
  },
  async deletar(req, res) {
    try {
      const { numero_pedido_compra } = req.params;
      const [rows, fields] = await db.query(`SELECT * FROM itens_pedidos_compra WHERE id_pedido_compra=?`, [numero_pedido_compra]);

      for (const item of rows) {
        const { id } = item;
        const deleteItemQuery = `DELETE FROM itens_pedidos_compra
                                 WHERE id=?`;
        await db.query(deleteItemQuery, [id]);
      }

      const deletePedidoQuery = `DELETE FROM pedidos_compra WHERE id=?`;
      await db.query(deletePedidoQuery, [numero_pedido_compra]);

      res.status(200).json({ success: true, message: 'Pedido deletadoo com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar venda:', error);
      res.status(500).json({ success: false, message: 'Erro ao deletar pedido' });
    }
  },
};

module.exports = pedidosCompraController;