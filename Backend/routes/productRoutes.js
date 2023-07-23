import { Router } from 'express';
import { Produto } from '../models/Produto.js'
import { Estoque } from '../models/Estoque.js';

import sequelize from '../db.js';

const productRoutes = Router();

// lista os produtos que não tem registro na TB_estoque
productRoutes.get('/listaProdutosSemEstoque', async (req, res) => {
  try {
    const listaProdutosSemEstoque = await Produto.findAll({
      where: {
        '$estoque.produto_id$': null
      },
      include: [{
        model: Estoque,
        as: 'estoque',
        required: false
      }]
    });

    if (listaProdutosSemEstoque) {
      res.status(200).send(listaProdutosSemEstoque)

    } else {
      res.status(404).json({ message: 'Todos os produtos já estão cadastrados no estoque!' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Erro de conexão com a API.'})
  }

})

productRoutes.post('/cadastrarProdutos', async (req, res) => {
  try {
    const { produto_nome, produto_descricao, produto_marca, produto_valorCompra, produto_valorVenda } = req.body;
    const novoProduto = await Produto.create({
      produto_nome: produto_nome,
      produto_descricao: produto_descricao,
      produto_marca: produto_marca,
      produto_valorCompra: produto_valorCompra,
      produto_valorVenda: produto_valorVenda
      
    });

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
  const { produto_id, produto_nome, produto_descricao, produto_marca, produto_valorCompra, produto_valorVenda } = req.body

  try {

    const atualizarProduto = await Produto.update({
      produto_nome: produto_nome,
      produto_descricao: produto_descricao,
      produto_marca: produto_marca,
      produto_valorCompra: produto_valorCompra,
      produto_valorVenda: produto_valorVenda
    }, {
      where: {
        produto_id: produto_id
      }

    })

    if (atualizarProduto) {
      res.status(200).json({ message: 'Produto atualizado!' })
    } else {
      res.status(400).json({ message: 'Não foi possível atualizar o produto!' })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao conectar na API.' })
  }
})

export default productRoutes;