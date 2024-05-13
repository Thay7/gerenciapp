const { db, chaveSecreta } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = {
    async login(req, res) {
        try {
            const { login, senha } = req.body;

            const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [login]);
            const usuario = rows[0];

            if (!usuario)
                return res.status(404).json({ error: 'Usuário não encontrado' });

            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if (!senhaCorreta)
                return res.status(401).json({ error: 'Credenciais inválidas' });

            const token = jwt.sign({ id: usuario.id }, chaveSecreta, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao realizar login' });
        }
    }
};

module.exports = loginController;
