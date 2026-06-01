const express = require("express");
const app = express();
const PORT = 3000;
// Importa os controllers
const {listarProdutos} = require("./controllers/productsController");
const {listarUsuarios} = require("./controllers/usersControllers");

app.get("/produtos", listarProdutos); // ENDPOINT
app.get("/usuarios", listarUsuarios); // ENDPOINT

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});