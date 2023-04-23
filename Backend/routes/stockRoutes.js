import { Router } from 'express';
import { Estoque } from '../models/Estoque.js'

const stockRoutes = Router();

stockRoutes.get('/listaEstoque', async (req, res) => {

    try {
        const somaValorVenda = await Estoque.sum('estoque_produtoValorVenda');
        const listaEstoque = await Estoque.findAll()

        if (listaEstoque) {
            res.status(200).send({listaEstoque, somaValorVenda})
        } else {
            res.status(400).json({ message: 'Não foi possível listar o estoque!' })
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao conectar na API' })
    }

})

stockRoutes.put('/saidaEstoque', async (req, res) => {
    const {
        estoque_id,
        estoque_produtoQuantidade,
        quantidadeSaida
    } = req.body
    // aqui está estático mas é só mudar para a variável quantidadeSaida
    const novaQuantidade = estoque_produtoQuantidade - 7

    try {

        if (novaQuantidade >= 0) {
            const saidaEstoque = await Estoque.update(
                { estoque_produtoQuantidade: novaQuantidade },
                { where: { estoque_id: estoque_id } }
            )

            res.status(200).json({ message: "Movimentação registrada com sucesso!" })
        } else {
            res.status(400).json({ message: "A quantidade do produto não pode ser menor que zero! Por favor, abasteça o saldo desta peça." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao conectar na API' })
    }

})


stockRoutes.put('/entradaEstoque', async (req, res) => {
    const {
        estoque_id,
        estoque_produtoQuantidade,
        quantidadeEntrada
    } = req.body
    // aqui está estático mas é só mudar para a variável quantidadeEntrada
    let novaQuantidade = estoque_produtoQuantidade + 7

    try {


        const saidaEstoque = await Estoque.update(
            { estoque_produtoQuantidade: novaQuantidade },
            { where: { estoque_id: estoque_id } }
        )

        if (saidaEstoque) {
            res.status(200).json({ message: "Movimentação registrada com sucesso!" })
        } else {
            res.status(400).json({ message: "Não foi possível registrar a movimentação." })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro ao conectar na API' })
    }

})

export default stockRoutes