import { Router } from 'express';
import { Usuario } from '../models/Usuario.js'
import { Empresa } from '../models/Empresa.js'

const userRouter = Router();

userRouter.post('/cadastrarUsuario', async (req, res) => {
    const { usuarios_nome, usuarios_email, usuarios_login, usuarios_senha, usuarios_empresa } = req.body;

    try {
        const novoUsuario = await Usuario.create({
            usuarios_nome,
            usuarios_email,
            usuarios_login,
            usuarios_senha

        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.post('/dadosUsuario', async (req, res) => {
    const { usuarios_id } = req.body

    try {
        const editUsuario = await Usuario.findOne({
            where: {
                id: usuarios_id
            }


        })

        // falta mandar o update aqui...

        if (editUsuario) {
            res.status(200).send('Dados atualizado com sucesso!')
        } else {
            res.status(500).send('Os dados não foram atualizados!')
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


userRouter.post('/testee', async (req, res) => {
    const { login } = req.body

    const user = await Usuario.findOne({
        where: {
            usuarios_login: login
        },
        include: [{
            model: Empresa,
            attributes: ['empresa_id', 'empresa_razaoSocial', 'empresa_nomeFantasia', 'empresa_cnpj', 'empresa_logradouro', 'empresa_bairro', 'empresa_cidade', 'empresa_uf', 'empresa_numero'],
            as: 'TB_empresa'
        }]
    });

   

    if (user) {
        res.json({
            empresa: user.TB_empresa.empresa_cnpj
        })
    }
})

export default userRouter