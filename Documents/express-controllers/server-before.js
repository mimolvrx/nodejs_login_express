// Instalar 
const express = require('express');

// criar aplicação express
const app = express();

// Define a porta onde o servidor irá escutar
const PORT = 3000;

// cria uma rota GET para "/produtos"
app.get("/produtos", (req, res) => {
    // cria uma lista de produtos 
    const produtos = [
        {id: 1, nome: "Notebook", preco: 2500},
        {id: 2, nome: "Smartphone", preco: 1500},
    ];
    // Retorna a lista de produtos em formato JSON
    res.json(produtos);
});

// Inicia o servidor com na porta definida
app.listen(PORT, () => {
    // Exibe mensagem no terminal
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});