// Importa o módulo PATH que ajuda a montar os caminhos de arquivo HTML 
const path = require('path');

// Array que ira armazenar os usuários cadastrados
const usuarios = [];


function exibirCadastro(req, res) {
    const erro = req.query.erro;

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>Cadastro</title>
        </head>
        <body>
            <main class="container">
                <section class="card">
                    <h1>Cadastro</h1>
                    <p>Crie uma conta para acessar o sistema</p>

                    ${erro ? `
                        <div class="mensagem-erro">
                            Este e-mail já está cadastrado.
                        </div>
                    ` : ""}

                    <form action="/cadastro" method="POST" autocomplete="off">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" required>

                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu email" required>

                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required>

                        <button type="submit">Cadastrar</button>
                    </form>
                    <p class="texto-link">
                        Ainda não tem conta?
                        <a href="/login">Fazer login</a>
                    </p>
                </section>
            </main>
        </body>
        </html>
    `);
}

// Função respónsavel por processar o cadastro de um novo usuário
function cadastrarUsuario(req, res) {
    // Coleta das informações eviadas pelo formulário
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    // Verifica se os campos veio vazio
    if (!nome || !email || !senha) {
        return res.send(`
            <h1>Erro no cadastro</h1>
            <p>Preencha todos os campos.</p>
            <a href="/cadastro">Voltar para a tela de cadastro</a>
        `);
    }

    // Verifica se o email já existe na memória
    const usuarioExistente = usuarios.find(usuario => usuario.email === email);

    // Se o usuário já foi cadastrado, ele retornará uma nova url constando a chave "erro", que nos leva a função anterior, responsável por retornar a tela de cadastro com a mensagem erro.
    if (usuarioExistente) {
        return res.redirect("/cadastro?erro=email");
    }

    // Cria um novo objeto representado o novo usuário cadastrado
    const novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        senha: senha
    };

    // Envia o novo usuário para o nosso array de usuários
    usuarios.push(novoUsuario);

    // Confirmação via terminal de quais usuários estão cadastrados no meu sistema
    console.log("Usuários cadastrados:", usuarios);

    // Após cadastrar, redireciona o usuário para a tela de login com a confirmação de cadastro
    res.redirect("/login?cadastro=sucesso");
}

//Função responsável por exibir a página de login
function exibirLogin(req, res) {
    const erro = req.query.erro;
    const cadastro = req.query.cadastro;

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>Login</title>
        </head>
        <body>
            <main class="container">
                <section class="card">
                    <h1>Login</h1>
                    <p>Entre com os dados cadastrados</p>

                    ${cadastro ? `
                        <div class="mensagem-sucesso">
                            Cadastro realizado com sucesso! Faça login para continuar.
                        </div>
                        ` 
                    : ""}

                    ${erro ? `
                        <div class="mensagem-erro">
                            Email ou senha incorretos.
                        </div>
                        ` 
                    : ""}

                    <form action="/login" method="POST" autocomplete="off">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu email" required>

                        <label for="senha">Senha:</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required>

                        <button type="submit">Entrar</button>
                    </form>
                    <p class="texto-link"> Ainda não tem conta? 
                        <a href="/cadastro">Cadastre-se</a>
                    </p>
                </section>
            </main>
            
        </body>
        </html>
    `);
}
// Função responsável por realizar a validação do login
function realizarLogin(req, res) {
    // Captura os dados enviados pelo formulário de login
    const email = req.body.email;
    const senha = req.body.senha;
    // Procura no array um usuário com o mesmo email e senha informados pelo formulário do login
    const usuarioEncontrado = usuarios.find((usuario) => {
        return usuario.email === email && usuario.senha === senha;
    })
    if (!usuarioEncontrado) {
        return res.redirect("/login?erro=senha");
    }
    // Se o usuário for encontrado, redireciona para uma página de sucesso
    res.redirect(`/sucesso?nome=${usuarioEncontrado.nome}`);
}

// Função responsável por exibir a página de sucesso
function exibirSucesso(req, res) {
    // Captura o nome vindo da URL
    const nome = req.query.nome;

    // Envia como resposta um HTML simples
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login realizado</title>
            <link rel="stylesheet" href="/style.css">
        </head> 
        <body>
            <main class="container">
                <section class="card">
                    <h1>Login realizado com sucesso!</h1>
                    <p>Bem-vindo, ${nome}!</p>
                    <a class="link-button" href="/login">Voltar para a tela de login</a>
                </section>
            </main>
        </body>
        </html>
    `);
}

// Me permite acessar as funções de fora do arquivo
module.exports = {
    exibirCadastro,
    cadastrarUsuario,
    exibirLogin,
    realizarLogin,
    exibirSucesso
};