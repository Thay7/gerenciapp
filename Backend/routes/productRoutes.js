import { Router } from 'express';
import { Produto } from '../models/Produto.js'

const productRoutes = Router();

productRoutes.post('/cadastrarProdutos', async (req, res) => {
  try {
    const { produtos_nome, produtos_descricao, produtos_marca, produtos_valorCompra, produtos_valorRevenda } = req.body;
    const novoProduto = await Produto.create({ produtos_nome, produtos_descricao, produtos_marca, produtos_valorCompra, produtos_valorRevenda });

    if (novoProduto) {
      res.status(200).json({ message: 'Produto cadastrado!' })
    } else {
      res.status(400).json({ message: 'Produto não cadastrado! Revise os campos e tente novamente' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro de conexão com a API.' });
  }
})

productRoutes.get('/listaProdutos', async (req, res) => {

  try {
    const produtos = await Produto.findAll({
      order: [['produto_nome', 'ASC']]
    })

    if (produtos) {
      res.status(200).send(produtos)
    } else {
      res.status(404).json({ message: 'Nenhuma peça cadastrada' })
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar peças.' });
  }

})

productRoutes.delete('/excluirProduto', async (req, res) => {
  const { produto_id } = req.body
  console.log(produto_id)
  try {
    const excluirProduto = await Produto.destroy({
      where: {
        produto_id: produto_id
      }
    })

    if (excluirProduto) {
      res.status(200).json({ message: 'Produto excluído!' })
    } else {
      res.status(400).json({ message: 'Não foi possível excluir o produto!' })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao conectar na API.' });
  }
})

productRoutes.put('/atualizarProduto', async (req, res) => {
  const {produto_id, produto_nome, produto_descricao, produto_valorCompra, produto_valorVenda} = req.body

  try {

    const atualizarProduto = await Produto.update({
      produto_nome: produto_nome,
      produto_descricao: produto_descricao,
      produto_valorCompra: produto_valorCompra,
      produto_valorVenda: produto_valorVenda
    },{
      where: {
        produto_id: produto_id
      }
    })

    if(atualizarProduto) {
      res.status(200).json({message: 'Produto atualizado!'})
    } else {
      res.status(400).json({message: 'Não foi possível atualizar o produto!'})
    }

  } catch (error) {
    console.log(error)
    req.status(500).json({message: 'Erro ao conectar na API.'})
  }
})

export default productRoutes;