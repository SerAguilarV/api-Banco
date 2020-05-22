const mongoose = require('mongoose')
let _ModelUsuario = null
let _usuario = null


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
                "_id":1}}
    ]);
        return usuario[0]

    }

    async getIDBanco(idBanco){
        const usuario = await _ModelUsuario.findOne({"ID":idBanco},{});
        return usuario

    }

    async getAll(nivel, page){
        if(!page){
            page = 1;
        }
        if (nivel){
            const usuarios = await _ModelUsuario.find({NIVEL:nivel},{ SUELDO: false}).skip((page-1)*5).limit(5);
            return usuarios
        }
        else{
            const usuarios = await _ModelUsuario.find({},{ SUELDO: false}).skip((page-1)*5).limit(5);
            return usuarios
        }
    }

    async search(cadena, nivel, page){
        if(!page){
            page = 1;
        }
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
                "_id":1,
                "NIVEL" : 1,
                "Datos.GENERO" : 1
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
        ])
        return {"Total" :  usuario.length, "Usuarios":usuario.slice((page-1)*5, (page-1)*5 +5)}
    }

    async update (id, entity){
        return await _ModelUsuario.findById(id, function (err, doc) {
            Object.keys(entity).forEach((element)=>{
                if(entity != "_id"){
                    console.log(element)
                    doc[element] = entity[element] 
                }})
            doc.save(function(err){
                if (err){
                    console.log("Error al guardar: " + err)
                }
            })
        })
    }
}

module.exports = ServiceUsuario