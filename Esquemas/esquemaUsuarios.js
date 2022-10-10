const mongoose= require("mongoose")
const {Schema}= require ("mongoose")
const esquemaUsuarios= new Schema ({
    nombreRegistro: {type: String, required:true},
    apellidoRegistro: {type: String, required:true},
    calleRegistro: {type: String},
    alturaRegistro: {type: Number},
    ciudadRegistro: {type: String},
    estadoRegistro: {type: String},
    cpRegistro: {type: String},
    emailRegistro: {type: String, required:true, lowercase: true, trim: true},
    email2Registro: {type: String, lowercase: true, trim: true},
    contraseñaRegistro: {type: String, required:true},
    contraseña2Registro: {type: String},
},
{timestamps: true}
)


const Usuarios= mongoose.model ("Usuarios", esquemaUsuarios)

module.exports= Usuarios

