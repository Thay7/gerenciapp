const express = require('express');
const app = express();

app.use(express.json());

// Rotas
app.use('/api/itens', require('./routes/itensRoutes'));
app.use('/api/vendas', require('./routes/vendasRoutes'));
app.use('/api/pedidosCompra', require('./routes/pedidosCompraRoutes'));
app.use('/api/fornecedores', require('./routes/fornecedoresRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});