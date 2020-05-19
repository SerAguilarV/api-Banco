
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

    async search(req, res){
        const {cadena} = req.query
        const usuarios = await _ServiceUsuarios.search(cadena.toLowerCase())
        return res.send(usuarios)
    }

    async update(req, res){
        const {body} = req
        const {idMongo} =  req.params
        const updatedUser = await _ServiceUsuarios.update(idMongo, body)
        return res.send(updatedUser)
    }
}

module.exports = UsuarioController