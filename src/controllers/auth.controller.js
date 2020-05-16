let _authService = null

class AuthController{
    constructor({AuthService}){
        _authService = AuthService
    }

    async signIn(req, res){
        const {body} = req
        const creds = await _authService.signIn(body)
        return res.send(creds)
    }
}

module.exports = AuthController