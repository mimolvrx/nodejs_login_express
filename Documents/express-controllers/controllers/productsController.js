// Função responsável por listar os produtos
function listarProdutos(req, res) {
    // Criar uma lista de produtos
    const produtos = [
        {id: 1, nome: "Notebook", preco: 2500},
        {id: 2, nome: "Smartphone", preco: 1500},
    ];
    // Retorna a lista em formato JSON
    res.json(produtos);
}
// Exportar a função para que ela possa ser utilizada em outros arquivos 
module.exports = {
    listarProdutos
};