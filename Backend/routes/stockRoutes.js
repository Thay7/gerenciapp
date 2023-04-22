import { Router } from 'express';
import { Estoque } from '../models/Estoque.js'

const stockRoutes = Router();

stockRoutes.post('/cadastrarPecas', async (req, res) => {
    try {
        const { peca_descricao, peca_modelo, peca_valorRevenda, peca_valorCompra, peca_marca } = req.body;
        const novaPeca = await Estoque.create({ peca_descricao, peca_modelo, peca_valorRevenda, peca_valorCompra, peca_marca });
    
        res.status(201).json(novaPeca);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar peça.' });
      }
})

stockRoutes.get('/listaPecas', async (req, res) => {

  try {
    const pecas = await Estoque.findAll()
    if (pecas) {
      res.status(200).send(
        pecas
      )
    }
    
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: 'Erro ao listar peças.' });
  }
})

export default stockRoutes;