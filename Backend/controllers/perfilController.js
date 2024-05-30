const { db } = require('../db');

const perfilController = {
    async dadosPerfil(req, res) {
        try {
            const { id } = req.params;

            const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            const usuario = rows[0];

            if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

            res.status(200).json({ usuario });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erro ao obter perfil' });
        }
    }
};

module.exports = perfilController;
