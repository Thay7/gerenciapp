const produtosController = {
  listar(req, res) {
    const produtos = [
      {
        produto_id: 1,
        produto_nome: 'Aro da api',
        produto_referencia: '1686821',
        produto_descricao: 'descrição do produto',
        produto_marca: 'marca x',
        produto_valorCompra: 10,
        produto_valorVenda: 25,
      },
      {
        produto_id: 2,
        produto_nome: 'Pneu Moto da api',
        produto_referencia: '1686822',
        produto_descricao: 'descrição do produto',
        produto_marca: 'marca x',
        produto_valorCompra: 10,
        produto_valorVenda: 25,
      },
    ];

    res.json(produtos);
  },
  // ...outros métodos do controller...
};

module.exports = produtosController;
