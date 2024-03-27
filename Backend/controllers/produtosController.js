const db = require('../db');

const produtosController = {
  async listar(req, res) {
    console.log('back')

    try {
      const [rows, fields] = await db.query('SELECT * FROM itens WHERE tipo = "Produto"');
      res.json(rows); 

    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).send('Erro ao listar itens');
    }
  },
  async cadastrar(req, res) {
    try {
      const { nome, cod_produto, descricao, marca, valor_compra, valor_venda, tipo } = req.body;
      const query = `INSERT INTO itens (nome, cod_produto, descricao, marca, valor_compra, valor_venda, tipo)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`

      await db.query(query, [nome, cod_produto, descricao, marca, valor_compra, valor_venda, tipo]);

      res.status(200).json({ success: true, message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao cadastrar o produto' });
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

module.exports = produtosController;