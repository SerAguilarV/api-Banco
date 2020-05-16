const {createContainer, asClass, asFunction, asValue} = require("awilix")

// Environment Variables
const config = require("../config")

// Export server (Exist in this folder in "index.js" file)
const ServerBanco = require(".")

// Export models
const {ModeloUsuarios} = require("../models")

// Export service
const {UsuarioService, AuthService} = require("../services")

// Export Controllers
const {ControllerUsuario,AuthController} = require("../controllers")

// Export Routes
const {RoutesUsuarios,RoutesAuth} = require("../routes/index.routes")

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
    UsuarioService: asClass(UsuarioService).singleton(),
    AuthService : asClass(AuthService).singleton()
})
// Controllers
.register({
    ControllerUsuario: asClass(ControllerUsuario).singleton(),
    AuthController : asClass(AuthController).singleton()
})
// Routes
.register({
    RoutesUsuarios: asClass(RoutesUsuarios).singleton(),
    RoutesAuth : asClass(RoutesAuth).singleton()
})
// Environment Variables and Server
.register({
    config : asValue(config),
    ServerBanco: asClass(ServerBanco).singleton(),
    RutasFunction: asFunction(RutasFunction).singleton()
})

module.exports = container