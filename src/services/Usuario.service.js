const mongoose = require('mongoose')
let _ModelUsuario = null

class ServiceUsuario{
    constructor({ModeloUsuarios}){
        _ModelUsuario = ModeloUsuarios
    }

    async getInfo(id){
        let usuario = await _ModelUsuario.aggregate([
            {$match:{_id:mongoose.Types.ObjectId(id)}},
            {"$lookup": {
                from: "Datos_Usuarios",
                localField: "ID",
                foreignField: "ID",
                as: "Datos"
            }},
            {"$unwind":"$Datos"},
            {"$project" : {
                "Datos._id" : 0,
                "Datos.ID" : 0,
                "_id":0}}
    ]);
        return usuario[0]

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

    async search(cadena){
        const usuario = await _ModelUsuario.aggregate([
            {"$lookup": {
                from: "Datos_Usuarios",
                localField: "ID",
                foreignField: "ID",
                as: "Datos"
            }},
            {"$unwind":"$Datos"},
            {"$project" : {
                "Datos.NOMBRE" : 1,
                "Datos.NombreL" : { $toLower: "$Datos.NOMBRE" },
                "Datos.APELLIDOS" : 1,
                "Datos.APELLIDOSL" : { $toLower: "$Datos.APELLIDOS" },  
                "ID":1,
                "_id":0
            }},
            {"$match":{ "$or" : [
                {"ID" : {"$regex":cadena}},
                {"Datos.NombreL": {"$regex":cadena}},
                {"Datos.APELLIDOSL": {"$regex":cadena}}
                ]}
            },
            {"$project" : {
                "Datos.NombreL" : 0,
                "Datos.APELLIDOSL" : 0,
            }},
        ]);
        return usuario

    }
}

module.exports = ServiceUsuario