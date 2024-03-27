const db = require('../db');

const servicosController = {
  async listar(req, res) {
    try {
      const [rows, fields] = await db.query('SELECT * FROM itens WHERE tipo = "Servico"');
      res.json(rows);
    } catch (error) {
      console.error('Erro ao listar servicos:', error);
      res.status(500).send('Erro ao listar itens');
    }
  },
  async cadastrar(req, res) {
    try {
      const { nome, descricao, valor_venda, tipo } = req.body;
      const query = `INSERT INTO itens (nome, cod_produto, descricao, marca, valor_compra, valor_venda, tipo)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`

      await db.query(query, [nome, null, descricao, null, null, valor_venda, tipo]);

      res.status(200).json({ success: true, message: 'Serviço cadastrado com sucesso!' });
    } catch (error) {

      res.status(500).json({ success: false, message: 'Erro ao cadastrar o serviço' });
    }
  },
  async editar(req, res) {
    try {
      const { nome, descricao, valor_venda } = req.body;
      const { id } = req.params;

      const query = `UPDATE itens 
                      SET nome=?, descricao=?, valor_venda=? 
                      WHERE id=?
                      AND tipo = "Servico"`;

      await db.query(query, [nome, descricao, valor_venda, id]);

      res.status(200).json({ success: true, message: 'Serviço  editado com sucesso!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao editar o serviço' });
    }
  },
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const query = `DELETE FROM itens WHERE id=? AND tipo = "Servico"`;

      await db.query(query, [id]);

      res.status(200).json({ success: true, message: 'Servçco deletado com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao deletar o produto' });
    }
  },
};

module.exports = servicosController;