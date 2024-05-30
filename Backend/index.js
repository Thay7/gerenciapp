const express = require('express');
const app = express();

app.use(express.json());

// Rotas
app.use('/api/login', require('./routes/loginRoutes'));
app.use('/api/home', require('./routes/homeRoutes'));
app.use('/api/perfil', require('./routes/perfilRoutes'));
app.use('/api/vendas', require('./routes/vendasRoutes'));
app.use('/api/produtos', require('./routes/produtosRoutes'));
app.use('/api/servicos', require('./routes/servicosRoutes'));
app.use('/api/estoque', require('./routes/estoqueRoutes'))
app.use('/api/pedidosCompra', require('./routes/pedidosCompraRoutes'));
app.use('/api/fornecedores', require('./routes/fornecedoresRoutes'));
app.use('/api/cadastros', require('./routes/cadastrosRoutes'))
app.use('/api/relatorios', require('./routes/relatoriosRoutes'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});