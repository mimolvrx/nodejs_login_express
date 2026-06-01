// Instalar 
const express = require('express');
// criar aplicação express
const app = express();
// Define a porta onde o servidor irá escutar
const PORT = 3000;
// Importa a função listarProdutos do controller
const {listarProdutos} = require("./controllers/productsController");
// Cria um Endpoint (método GET + rota "/produtos")
// Quando este for acessado, a função listarProdutos será disparada
app.get("/produtos", listarProdutos);
// Inicia o servidor na porta definida
app.listen(PORT, () => {
    // Exibe mensagem no terminal
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});