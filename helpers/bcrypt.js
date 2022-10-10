const bcrypt = require("bcrypt")
const saltRnd= 10

async function encriptar (pass){
return await bcrypt.hash(pass, saltRnd)
}

async function desencriptar (pass, passEncriptada){
    return await bcrypt.compare(pass, passEncriptada)
}

module.exports={encriptar, desencriptar}