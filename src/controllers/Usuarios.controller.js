
let _ServiceUsuarios = null

class UsuarioController{
    constructor({UsuarioService}){
        _ServiceUsuarios = UsuarioService
    }

    async get_info(req, res){
        const {idmongo} = req.params;
        const {id} = req.user;
        if(id!=idmongo){
            const error = new Error()
            error.message = "Permiso denegado"
            error.status = 401
            throw error
        }
        const usuario = await _ServiceUsuarios.getInfo(idmongo);
        return res.send(usuario);
    }

    async get_ID(req, res){
        const {idmongo} = req.params;
        const usuario = await _ServiceUsuarios.getIDBanco(idmongo);
        return res.send(usuario);
    }

    async getAll(req, res){
        const {nivel, page} = req.query
        const usuarios = await _ServiceUsuarios.getAll(nivel, page)
        return res.send(usuarios)
    }

    async search(req, res){
        const {cadena, nivel, page} = req.query
        const usuario = await _ServiceUsuarios.search(cadena.toLowerCase(),nivel, page)
        return res.send(usuario)
    }

    async update(req, res){
        const {body} = req
        const {idMongo} =  req.params
        const {id} = req.user;
        if(id!=idMongo){
            const error = new Error()
            error.message = "Permiso denegado"
            error.status = 401
            throw error
        }
        const updatedUser = await _ServiceUsuarios.update(idMongo, body)
        return res.send(updatedUser)
    }
}

module.exports = UsuarioController