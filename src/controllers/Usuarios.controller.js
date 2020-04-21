
let _ServiceUsuarios = null

class UsuarioController{
    constructor({UsuarioService}){
        _ServiceUsuarios = UsuarioService
    }

    async get_info(req, res){
        const {idmongo} = req.params;
        const usuario = await _ServiceUsuarios.getInfo(idmongo);
        console.log("Usuario: " + usuario)
        return res.send(usuario);
    }

    async get_ID(req, res){
        const {idmongo} = req.params;
        const usuario = await _ServiceUsuarios.getIDBanco(idmongo);
        return res.send(usuario);
    }

    async getAll(req, res){
        const {nivel} = req.query
        const usuarios = await _ServiceUsuarios.getAll(nivel)
        return res.send(usuarios)
    }
    
}

module.exports = UsuarioController