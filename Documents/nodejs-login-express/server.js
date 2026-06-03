// Importa a biblioteca do Express
const express = require('express');

// Importa o módulo PATH que ajuda a trabalhar com caminhos de arquivos e pastas HTML
const path = require('path');

// Importa todas as funções do controller (autenticação)
const {
    exibirCadastro,
    cadastrarUsuario,
    exibirLogin,
    realizarLogin,
    exibirSucesso
} = require('./controllers/authControllers');

// Cria a aplicação Express
const app = express();

const PORT = 3000; // Definição da porta

// Middleware natvi do express para permitir que o express leia os dados enviados por formulários HTML
app.use(express.urlencoded({ extended: true })); 

// Middleware nativo do express que serve para alcançar e exibir os arquivos da pasta public. Assim o express acessa nosso CSS e as páginas HTML
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial do projeto
// Quando acessarmos http://localhost:3000 o usuário já será redirecionado para a tela de login
app.get("/", (req, res) => {
    res.redirect("/login");
})

// Endpoint (méttodo GET + rota "/cadastro") para exibir a tela de cadastro
app.get("/cadastro", exibirCadastro);

// Endpoint (método POST + rota "/cadastro") para receber os daos do formulário de cadastro
app.post("/cadastro", cadastrarUsuario);

// Endpoint (método GET + rota "/login") para exibir a tela de login
app.get("/login", exibirLogin);

// Endpoint (método POST + rota "/login") para receber os dados do formulário de login
app.post("/login", realizarLogin);

// Endpoint (método GET + rota "/sucesso") para exibir a tela de sucesso após realizar o login corretamente
app.get("/sucesso", exibirSucesso);

// Inicia o servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});