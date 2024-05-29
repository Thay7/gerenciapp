const { db, chaveSecreta } = require('../db');
const bcrypt = require('bcrypt');
const formatterdateandtime = require('../utils/formatterdateandtime');

const cadastrosController = {
    async listarCadastros(req, res) {
        try {
            const listCadastros = [
                {
                    nome: 'Fornecedores',
                    dados: []
                },
                {
                    nome: 'Usuários',
                    dados: []
                },
                {
                    nome: 'Movimento Caixa',
                    dados: []
                }
            ];

            //Fornecedores
            const [rowsFornecedores] = await db.query(`SELECT * FROM fornecedores ORDER BY id DESC`);
            listCadastros[0].dados = rowsFornecedores.length > 0 ? rowsFornecedores : [];

            //Usuarios
            const [rowsUsuarios] = await db.query(`SELECT * FROM usuarios ORDER BY id DESC`);
            listCadastros[1].dados = rowsUsuarios.length > 0 ? rowsUsuarios : [];

            //Movimento caixa
            const [rowsMovimentoCaixa] = await db.query(`SELECT * FROM movimento_caixa ORDER BY id DESC`);
            listCadastros[2].dados = rowsMovimentoCaixa.length > 0 ? rowsMovimentoCaixa : [];

            res.status(200).send(listCadastros);
        } catch (error) {
            res.status(500).send('Erro ao listar itens');
        }
    },
    async editarUsuario(req, res) {
        try {
            const { nome, usuario, email } = req.body;
            const { id } = req.params;

            const query = `UPDATE usuarios 
                          SET nome=?, usuario=?, email=?
                          WHERE id=?`;

            await db.query(query, [nome, usuario, email, id]);
            res.status(200).json({ success: true, message: 'Usuário editado com sucesso!' });

        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao editar o usuário' });
        }
    },
    async editarFornecedor(req, res) {
        try {
            const { nome_fantasia, razao_social, cnpj, contato } = req.body;
            const { id } = req.params;

            const query = `UPDATE fornecedores 
                          SET nome_fantasia=?, razao_social=?, cnpj=?, contato=? 
                          WHERE id=?`;

            await db.query(query, [nome_fantasia, razao_social, cnpj, contato, id]);

            res.status(200).json({ success: true, message: 'Fornecedor editado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao editar o fornecedor' });
        }
    },
    async editarMovCaixa(req, res) {
        try {
            const { tipo, descricao, valor } = req.body;
            const { id } = req.params;

            const query = `UPDATE movimento_caixa 
                          SET tipo=?, descricao=?, valor=?
                          WHERE id=?`;

            await db.query(query, [tipo, descricao, valor, id]);

            res.status(200).json({ success: true, message: 'Movimento caixa editado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao editar o movimento caixa' });
        }
    },
    async cadastrarUsuario(req, res) {
        try {
            const { nome, usuario, email, senha } = req.body;
            const hashedPassword = await bcrypt.hash(senha, 10);

            const query = `INSERT INTO usuarios (nome, usuario, email, senha)
                           VALUES (?, ?, ?, ?)`
            await db.query(query, [nome, usuario, email, hashedPassword]);

            res.status(200).json({ success: true, message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
        }
    },
    async cadastrarFornecedor(req, res) {
        try {
            const { nome_fantasia, razao_social, cnpj, contato } = req.body;

            const query = `INSERT INTO fornecedores (nome_fantasia, razao_social, cnpj, contato)
                           VALUES (?, ?, ?, ?)`
            await db.query(query, [nome_fantasia, razao_social, cnpj, contato]);

            res.status(200).json({ success: true, message: 'Fornecedor cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao cadastrar fornecedor' });
        }
    },
    async cadastrarMovimentoCaixa(req, res) {
        try {
            const dataHoraAtual = formatterdateandtime(new Date());
            const { tipo, descricao, valor } = req.body;

            const query = `INSERT INTO movimento_caixa (tipo, descricao, valor, data_hora)
                           VALUES (?, ?, ?, ?)`

            await db.query(query, [tipo, descricao, valor, dataHoraAtual]);

            res.status(200).json({ success: true, message: 'Movimento cadastrado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao cadastrar movimento caixa' });
        }
    },
    async deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            const query = `DELETE FROM usuarios WHERE id=?`;

            await db.query(query, [id]);
            res.status(200).json({ success: true, message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao deletar o usuário' });
        }
    },
    async deletarFornecedor(req, res) {
        try {
            const { id } = req.params;
            const query = `DELETE FROM fornecedores WHERE id=?`;

            await db.query(query, [id]);
            res.status(200).json({ success: true, message: 'Fornecedor editado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao deletar o fornecedor' });
        }
    },
    async deletarMovCaixa(req, res) {
        try {
            const { id } = req.params;
            const query = `DELETE FROM movimento_caixa WHERE id=?`;

            await db.query(query, [id]);
            res.status(200).json({ success: true, message: 'Movimento caixa deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao deletar o movimento caixa' });
        }
    },
};

module.exports = cadastrosController;