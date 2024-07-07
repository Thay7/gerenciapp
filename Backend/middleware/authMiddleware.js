const jwt = require('jsonwebtoken');
const { chaveSecreta } = require('../db');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }

    jwt.verify(token.replace('Bearer ', ''), chaveSecreta, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }
        req.userId = decoded.id; // Armazena o ID do usuário decodificado na requisição para uso posterior
        next(); // Avança para a próxima função middleware ou rota
    });
};

module.exports = authMiddleware;