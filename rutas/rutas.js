const express=require ("express")
const router= express.Router()
const users= require ("../controladores/controladores")
const ReglasDeValidacion= require ("../validaciones/reglasDeValidacion")
const validacionRegistro=require("../validaciones/validacionRegistro")
const autentificacion=require("../helpers/autentificacion")




router.get("/contacto", users.formulario)
router.post("/contacto", ReglasDeValidacion, users.envioFormulario)
router.get("/login", users.login )
router.post("/login", users.envioLogin)
router.get("/registracion",  users.registracion)
router.post("/registracion", users.envioRegistracion)
router.get("/logout", users.logout)
router.get("/modificacion", autentificacion, users.modificacion)
router.post("/modificacion", autentificacion, users.envioModificacion)
router.get("/eliminarCuenta", autentificacion, users.eliminarCuenta)



module.exports=router