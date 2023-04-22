import { Router } from 'express';
import {Usuario} from '../models/Usuario.js'

const authRoutes = Router();

authRoutes.post('/login', async (req, res) => {
    const { login, senha } = req.body
    
    try {
        const usuario = await Usuario.findOne({
            where: {
                usuarios_login: login,
            },
        });

        if (!usuario) {
            res.status(401).send('Credenciais inválidas.');
        } else if (usuario.usuarios_senha !== senha) {
            res.status(401).send('Credenciais inválidas.');
        } else {
            res.status(200).json({
                company: usuario.usuarios_empresa,
                id: usuario.usuarios_id
                
            });
            console.log('osjndjajdsajdas')
        }
    } catch (error) {
        res.status(500).send('Erro ao buscar usuário.');
    }
});

export default authRoutes