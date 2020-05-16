// container from awilix
const container = require("./src/container/container")

// server from container
const Server = container.resolve("ServerBanco")

// connect to MYSQL
const {MONGO_URI} = require("./src/config")
const mongoose = require("mongoose")

// mongoose.set("userCreateIndex",true)
mongoose.connect(MONGO_URI, 
    {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(()=>Server.start())
    .catch(console.log)