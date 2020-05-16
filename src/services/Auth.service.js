const {sign} = require("jsonwebtoken")
const {JWT_SECRET} = require("../config");

let _userService = null

class AuthService{

    constructor({UsuarioService}){
        _userService = UsuarioService
    }

    async signIn(user){
        const {username, password} = user;
        const userExist = await _userService.getIDBanco(username)
        if (!userExist){
            const error = new Error()
            error.message = "Usuario no existe"
            error.status = 404
            throw error
        }
        const userToEncode = {
            username: userExist.ID,
            id: userExist._id
        }
        const validPassword = await userExist.CheckPass(password)
        if (validPassword["NewPass"]){
            const token = sign({userToEncode}, JWT_SECRET, {expiresIn: "4h"})
            return {token, newPass:true}
        } else if(!validPassword["Valid"]){
            const error = new Error()
            error.status = 400
            error.message = "Contraseña invalida"
            throw error
        }
        const token = sign({userToEncode}, JWT_SECRET, {expiresIn: "4h"})
        return {token, user: userExist}
    }


}

module.exports = AuthService