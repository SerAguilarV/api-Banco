const {Router} = require("express")

module.exports = function RouterUsuario({ControllerUsuario}){
    const router = Router()
    router.get("/:idmongo/info", ControllerUsuario.get_info)
    router.get("/:idmongo/IDBanco", ControllerUsuario.get_ID)
    router.get("/allusers", ControllerUsuario.getAll)
    router.get("/search", ControllerUsuario.search)
    return router
}