const db = require('../db');

const estoqueController = {
    async listarProdutosSemEstoque(req, res) {
        try {
            const [rows, fields] = await db.query('SELECT * FROM itens WHERE id not in ( SELECT id_produto from estoque) AND tipo = "Produto"');
            res.json(rows);
            console.log(rows)

        } catch (error) {
            res.status(500).send('Erro ao listar itens');
        }
    },
    async verificaQuantidadeItem(req, res) {
        try {
            const formData = req.body;

            for (const item of formData) {
                const { id } = item;
                const { quantidade } = item;

                const [rows, fields] = await db.query(`SELECT * FROM estoque WHERE id_produto=?`, [id]);

                //Se quantidade do item na venda for maior que a quantidade no estoque dispara o erro
                if (item.tipo == "Produto" && quantidade > rows[0].quantidade)
                    throw new Error(500);
            }
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).send('Erro ao listar estoque dos itens');;
        }
    },
    async listar(req, res) {
        try {
            const [rows, fields] = await db.query('SELECT * FROM estoque e INNER JOIN itens i on e.id_produto = i.id WHERE i.tipo = "Produto"');
            res.json(rows);

        } catch (error) {
            res.status(500).send('Erro ao listar estoque');
        }
    },
    async cadastrar(req, res) {
        try {
            const { id_produto, quantidade, data_hora } = req.body;
            const query = `INSERT INTO estoque (id_produto, quantidade, data_hora)
                     VALUES (?, ?, ?)`

            await db.query(query, [id_produto, quantidade, data_hora]);

            res.status(200).json({ success: true, message: 'Entrada de estoque cadastrada com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao cadastrar estoque' });
        }
    },
    async editar(req, res) {
        try {
            const { quantidade, data_hora } = req.body;
            const { id } = req.params;

            const query = `UPDATE estoque 
                      SET quantidade=?, data_hora=?
                      WHERE id_produto=?`;
            await db.query(query, [quantidade, data_hora, id]);

            res.status(200).json({ success: true, message: 'Estoque editado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao editar estoque' });
        }
    }
};

module.exports = estoqueController;