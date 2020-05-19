const {Router} = require("express")
const {AuthMiddleware, ParseMiddleware} = require("../middlewares")
module.exports = function RouterUsuario({ControllerUsuario}){
    const router = Router()
    router.get("/:idmongo/info", [AuthMiddleware, ParseMiddleware] , ControllerUsuario.get_info)
    // router.get("/:idmongo/IDBanco", [AuthMiddleware, ParseMiddleware] ,ControllerUsuario.get_ID)
    router.get("/allusers", [AuthMiddleware, ParseMiddleware] ,ControllerUsuario.getAll)
    router.get("/search", [AuthMiddleware, ParseMiddleware] , ControllerUsuario.search)
    router.patch("/:idMongo", [AuthMiddleware, ParseMiddleware] ,ControllerUsuario.update)
    return router
}