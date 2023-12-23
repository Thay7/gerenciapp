const express = require('express');
const produtosRoutes = require('./routes/produtosRoutes');
//const funcionalidade2Routes = require('./routes/funcionalidade2Routes');

const app = express();

// Utilizando as rotas
app.use('/api/produtos', produtosRoutes);
//app.use('/api/funcionalidade2', funcionalidade2Routes);

// Outras configurações do servidor...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
