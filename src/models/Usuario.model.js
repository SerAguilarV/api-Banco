const mongoose = require("mongoose")
const {Schema} = mongoose;
const {compareSync, hashSync, genSaltSync} = require("bcryptjs");

const UsuarioSchema = new Schema({
    ID: {type: String, required: true},
    FECHA_INGRESO: {type: Date, required: true},
    NIVEL: {type: Number, required: true},
    SUELDO: {type: Number, required: true},
    // PASSWORD: {type: String, required: true}
}, {collection: "Usuarios"})

// UsuarioSchema.methods.toJSON = function(){
//     let usuario = this.toObject()
//     delete usuario.PASSWORD
//     return usuario
// }

// UsuarioSchema.methods.CheckPass = function(password){
//     return compareSync(password, this.PASSWORD )
// }

// UsuarioSchema.pre("save", async function(next){
//     const usuario = this
//     if (!usuario.isModified("PASSWORD")){
//         return next()
//     }

//     else{
//         const salt = genSaltSync(10)
//         const hashedPASS = hashSync(usuario.PASSWORD, salt)
//         usuario.PASSWORD = hashedPASS
//         next()
//     }   
// })

module.exports = mongoose.model("Usuarios", UsuarioSchema)