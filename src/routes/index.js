const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
require("express-async-errors")
const {ErrorMiddleware} = require("../middlewares")

function RutasFunction({RoutesUsuarios, RoutesAuth }){
    const router = express.Router()
    const apiRoutes = express.Router()
    apiRoutes.use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())

    apiRoutes.use("/usuarios", RoutesUsuarios)
    apiRoutes.use("/usuarios", RoutesAuth)
    // concat the url 
    router.use("/api/banco", apiRoutes)
    router.use(ErrorMiddleware)
    return router
}

module.exports = RutasFunction;