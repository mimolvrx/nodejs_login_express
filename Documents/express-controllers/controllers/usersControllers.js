function listarUsuarios(req, res){
    const usuarios = [
        {id: 1, nome: "Yasmim"},
        {id: 2, nome: "Gabrielly"}
    ];
    res.json(usuarios);
}
module.exports = {
    listarUsuarios
};