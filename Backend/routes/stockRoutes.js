import { Router } from 'express';

const stockRoutes = Router();

stockRoutes.post('/api/cadastrarPeca', async (req, res) => {
    try {
        const { peca_descricao, peca_modelo, peca_valorRevenda, peca_valorCompra, peca_marca } = req.body;
        const novaPeca = await Estoque.create({ peca_descricao, peca_modelo, peca_valorRevenda, peca_valorCompra, peca_marca });
    
        res.status(201).json(novaPeca);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar peça.' });
      }
})

export default stockRoutes;