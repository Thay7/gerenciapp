const db = require('../db'); // Importe a conexão

// Exemplo de um controller
const produtosController = {
  async listar(req, res) {
    try {
      const [rows, fields] = await db.query('SELECT * FROM produtos');
      res.json(rows); // Envie os resultados como JSON
    } catch (error) {

      console.error('Erro ao listar produtos:', error);
      res.status(500).send('Erro ao listar produtos');
    }
  },
  async cadastrar(req, res) {
    try {
      const { nome, cod_produto, descricao, marca, valor_compra, valor_venda } = req.body;
      const query = `INSERT INTO produtos (nome, cod_produto, descricao, marca, valor_compra, valor_venda)
                     VALUES (?, ?, ?, ?, ?, ?)`

      await db.query(query, [nome, cod_produto, descricao, marca, valor_compra, valor_venda]);

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
      const query = `UPDATE produtos 
                      SET nome=?, cod_produto=?, descricao=?, marca=?, valor_compra=?, valor_venda=? 
                       WHERE id=?`;

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

      const query = `DELETE FROM produtos WHERE id=?`;

      await db.query(query, [id]);

      res.status(200).json({ success: true, message: 'Produto editado com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao deletar o produto' });
    }
  },
};

module.exports = produtosController;