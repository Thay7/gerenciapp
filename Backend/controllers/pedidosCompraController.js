const db = require('../db'); // Importe a conexão

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
      const [rows, fields] = await db.query(`SELECT p.*, ip.id as item_id, i.nome, ip.valor, ip.quantidade, f.cnpj, f.nome_fantasia, f.razao_social, f.contato 
        FROM pedidos_compra p 
        INNER JOIN itens_pedidos_compra ip on ip.id_pedido_compra = p.id 
        INNER JOIN fornecedores f on p.id_fornecedor = f.id
        INNER JOIN itens i on ip.id_item = i.id
        ORDER BY p.id DESC`);
      const pedidosFormatados = rows.reduce((formattedSales, row) => {
        const foundSale = formattedSales.find(sale => sale.numero_pedido_compra === row.numero_pedido_compra);

        if (foundSale) {
          foundSale.itens.push({
            id: row.item_id,
            nome: row.nome,
            valor: row.valor,
            quantidade: row.quantidade
          });
        } else {
          const formattedSale = {
            numero_pedido_compra: row.numero_pedido_compra,
            itens: [
              {
                id: row.item_id,
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
  async editar(req, res) {
    try {
      const { nome, cod_produto, descricao, marca, valor_compra, valor_venda } = req.body;
      const { id } = req.params;
      const query = `UPDATE itens 
                      SET nome=?, cod_produto=?, descricao=?, marca=?, valor_compra=?, valor_venda=? 
                      WHERE id=?
                      AND tipo = "Produto"`;

      await db.query(query, [nome, cod_produto, descricao, marca, valor_compra, valor_venda, id]);

      res.status(200).json({ success: true, message: 'Produto editado com sucesso!' });
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao editar o produto' });
    }
  },
  async confirmarRetorno(req, res) {
    try {
      const { numero_pedido_compra } = req.params;
      console.log(numero_pedido_compra)
      const query = `UPDATE pedidos_compra 
                      SET recebido=?
                      WHERE numero_pedido_compra=?`;

      await db.query(query, [1, numero_pedido_compra]);

      res.status(200).json({ success: true, message: 'Pedido compra recebido com sucesso!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao editar o produto' });
    }
  },
  async deletar(req, res) {
    try {
      const { id } = req.params;
      console.log(id + 'back')

      const query = `DELETE FROM itens WHERE id=? AND tipo = "Produto"`;

      await db.query(query, [id]);

      res.status(200).json({ success: true, message: 'Produto editado com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao deletar o produto' });
    }
  },
};

module.exports = pedidosCompraController;