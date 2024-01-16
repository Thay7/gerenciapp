const db = require('../db'); // Importe a conexão

const vendasController = {
  async listar(req, res) {
    try {
      const [rows, fields] = await db.query(`SELECT v.id as id_venda, v.numero_venda, v.forma_pagamento, v.numero_parcelas, v.valor_total, v.data_hora, iv.nome, iv.valor, iv.quantidade, iv.id as item_id, i.* FROM vendas v INNER JOIN itens_venda iv on iv.id_venda = v.id INNER JOIN itens i on iv.id_item = i.id ORDER BY v.id DESC`);
      const vendasFormatadas = rows.reduce((formattedSales, row) => {

        // Verifica se a venda já existe no array de vendas formatadas
        const foundSale = formattedSales.find(sale => sale.numero_venda === row.numero_venda);

        // Se a venda já existe, apenas adiciona o item
        if (foundSale) {
          foundSale.itens.push({
            id_item: row.item_id,
            nome: row.nome,
            valor: row.valor,
            quantidade: row.quantidade
          });
        } else {

          // Se não existe, cria uma nova venda formatada
          const formattedSale = {
            id: row.id_venda,
            numero_venda: row.numero_venda,
            itens: [
              {
                id_item: row.item_id,
                nome: row.nome,
                valor: row.valor,
                quantidade: row.quantidade
              }
            ],
            forma_pagamento: row.forma_pagamento,
            numero_parcelas: row.numero_parcelas,
            valor_total: row.valor_total,
            data_hora: row.data_hora
          };

          formattedSales.push(formattedSale);
        }
        return formattedSales;
      }, []);
      res.json(vendasFormatadas);
    } catch (error) {
      console.error('Erro ao listar vendas: ', error);
      res.status(500).send('Erro ao listar vendas');
    }
  },
  async cadastrar(req, res) {
    try {
      const { forma_pagamento, numero_parcelas, valor_total, data_hora, itens } = req.body;

      //Adicionado a venda ao banco
      const insertVenda = `INSERT INTO vendas (forma_pagamento, numero_parcelas, valor_total, data_hora)
                     VALUES (?, ?, ?, ?)`
      await db.query(insertVenda, [forma_pagamento, numero_parcelas, valor_total, data_hora]);

      //Recuperando o id da venda para inserir numero venda e linkar com os itens 
      const [rows, fields] = await db.query('SELECT ID FROM vendas ORDER BY ID DESC LIMIT 1');
      const id_venda = rows[0].ID;

      //Inserindo o número da venda
      const anoAtual = new Date().getFullYear();
      const numero_venda = `${anoAtual}${id_venda}`;

      const insertNumeroVenda = `UPDATE vendas 
                                 SET numero_venda=?
                                 WHERE id=?`
      await db.query(insertNumeroVenda, [numero_venda, id_venda]);

      //Iteração sobre o array de itens e inserção no banco de dados
      for (const item of itens) {
        const { nome, valor_venda, quantidade, id } = item;
        const insertItemQuery = `INSERT INTO itens_venda (id_venda, nome, valor, quantidade, id_item)
                                 VALUES (?, ?, ?, ?, ?)`;

        await db.query(insertItemQuery, [id_venda, nome, valor_venda, quantidade, id]);
      }

      res.status(200).json({ success: true, message: 'Venda cadastrada com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao cadastrar a venda' });
    }
  },
  async editar(req, res) {
    try {
      console.log('bateu no back')
      const { data_hora, forma_pagamento, numero_parcelas, valor_total, itens } = req.body;
      const { id } = req.params;

      console.log(id)

      const updateVenda = `UPDATE vendas 
                      SET data_hora=?, forma_pagamento=?, numero_parcelas=?, valor_total=?
                      WHERE id=?`;
      await db.query(updateVenda, [data_hora, forma_pagamento, numero_parcelas, valor_total, id]);

      //Atualizando os itens da venda
      for (const item of itens) {
        const { valor, quantidade, id_item, } = item;
        const insertItemQuery = `UPDATE itens_venda 
                                 SET valor=?,
                                 quantidade=?
                                 WHERE id_venda=?
                                 AND id=?`;

        console.log("Consulta:", insertItemQuery, [valor, quantidade, id, id_item]);
        await db.query(insertItemQuery, [valor, quantidade, id, id_item]);
      }
      res.status(200).json({ success: true, message: 'Venda editada com sucesso!' });
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao editar a venda' });
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

module.exports = vendasController;