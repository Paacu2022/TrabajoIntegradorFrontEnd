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
router.get("/logout",autentificacion, users.logout)
router.get("/modiDatosPersonales", autentificacion, users.modiDatosPersonales)
router.post("/modiDatosPersonales", autentificacion, users.envioModificacion)
router.get("/eliminarCuenta", autentificacion, users.eliminarCuenta)
router.get("/navbarmodi", autentificacion, users.navbar)
router.get("/modiUsuContrase",autentificacion, users.modiUsuContrase)
router.post("/modiUsuContrase",autentificacion, users.validarContrasena)

router.get("/bienvenida", autentificacion, users.bienvenida)




module.exports=router