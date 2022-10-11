const express=require ("express")
const router= express.Router()
const users= require ("../controladores/controladores")
const ReglasDeValidacion= require ("../validaciones/reglasDeValidacion")
const validacionRegistro=require("../validaciones/validacionRegistro")
const autentificacion=require("../helpers/autentificacion")




router.get("/contacto", users.formulario)
router.post("/contacto", ReglasDeValidacion, users.envioFormulario)
router.get("/login", users.login )
router.post("/login", )
router.get("/registracion",  users.registracion)
router.post("/registracion", users.envioRegistracion)




module.exports=router