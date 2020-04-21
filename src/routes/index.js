const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
require("express-async-errors")

function RutasFunction({RoutesUsuarios}){
    const router = express.Router()
    const apiRoutes = express.Router()
    apiRoutes.use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression())

    apiRoutes.use("/usuarios", RoutesUsuarios)
    // concat the url 
    router.use("/api/banco", apiRoutes)
    return router
}

module.exports = RutasFunction;