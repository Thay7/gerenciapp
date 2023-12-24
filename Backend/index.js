const express = require('express');
const app = express();

app.use(express.json());

// Rotas
app.use('/api/produtos', require('./routes/produtosRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});