const {createContainer, asClass, asFunction, asValue} = require("awilix")

// Environment Variables
const config = require("../config")

// Export server (Exist in this folder in "index.js" file)
const ServerBanco = require(".")

// Export models
const {ModeloUsuarios} = require("../models")

// Export service
const {UsuarioService} = require("../services")

// Export Controllers
const {ControllerUsuario} = require("../controllers")

// Export Routes
const {RoutesUsuarios} = require("../routes/index.routes")

//Export RouterFunction
const RutasFunction = require("../routes")

// Create Container Awilix
const container = createContainer()

// Models
container.register({
    ModeloUsuarios: asValue(ModeloUsuarios)
}) 
// Services
.register({
    UsuarioService: asClass(UsuarioService).singleton()
})
// Controllers
.register({
    ControllerUsuario: asClass(ControllerUsuario).singleton()
})
// Routes
.register({
    RoutesUsuarios: asClass(RoutesUsuarios).singleton()
})
// Environment Variables and Server
.register({
    config : asValue(config),
    ServerBanco: asClass(ServerBanco).singleton(),
    RutasFunction: asFunction(RutasFunction).singleton()
})

module.exports = container