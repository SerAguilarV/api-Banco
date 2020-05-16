const {Router} = require("express")
const {AuthMiddleware, ParseMiddleware} = require("../middlewares")
module.exports = function RouterUsuario({ControllerUsuario}){
    const router = Router()
    router.get("/:idmongo/info", ControllerUsuario.get_info)
    router.get("/:idmongo/IDBanco", ControllerUsuario.get_ID)
    router.get("/allusers", ControllerUsuario.getAll)
    router.get("/search", ControllerUsuario.search)
    router.patch("/:IDBanco", [AuthMiddleware, ParseMiddleware] ,ControllerUsuario.update)
    return router
}