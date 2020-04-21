const express = require("express")
let _router = null
let _config = null

class ServerBanco{
    constructor({config, RutasFunction}){
        _router = express().use(RutasFunction)
        _config = config
    }

    start(){
        return new Promise(
            resolve => {
                _router.listen(_config.PORT, () => {
                    console.log(_config.APPLICATION_NAME + " is running on port " + _config.PORT)
                    resolve()
                })
            }
        )
    }
}

module.exports = ServerBanco