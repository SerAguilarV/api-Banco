let _ModelUsuario = null

class ServiceUsuario{
    constructor({ModeloUsuarios}){
        _ModelUsuario = ModeloUsuarios
    }

    async getInfo(id){
        let usuario = await _ModelUsuario.findById(id);
        return usuario

    }

    async getIDBanco(idBanco){
        const usuario = await _ModelUsuario.findOne({"ID":idBanco},{ SUELDO: false, _id: false});
        return usuario

    }

    async getAll(nivel){
       
        if (nivel){
            const usuarios = await _ModelUsuario.find({NIVEL:nivel},{ SUELDO: false, _id: false});
            return usuarios
        }
        else{
            const usuarios = await _ModelUsuario.find({},{ SUELDO: false, _id: false});
            return usuarios
        }
    }
}

module.exports = ServiceUsuario