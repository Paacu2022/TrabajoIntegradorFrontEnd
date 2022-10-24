const express=require ("express")
const router= express.Router()
const users= require ("../controladores/controladores")
const {ReglasDeValidacion, validacionModiTitular, validacionDatosPersonales}= require ("../validaciones/reglasDeValidacion")
const {validacionRegistro, validacionContrase }=require("../validaciones/validacionRegistro")
const autentificacion=require("../helpers/autentificacion")
const autentificacionTitular= require("../helpers/autentificacionTitular")



router.get("/contacto", users.formulario)
router.post("/contacto", ReglasDeValidacion, users.envioFormulario)
router.get("/login", users.login )
router.post("/login", users.envioLogin)
router.get("/registracion",  users.registracion)
router.post("/registracion", validacionRegistro, users.envioRegistracion)
router.get("/logout",autentificacion, users.logout)
router.get("/modiDatosPersonales", autentificacion, users.modiDatosPersonales)
router.post("/modiDatosPersonales", validacionDatosPersonales, autentificacion, users.envioModificacion)
router.get("/eliminarCuenta", autentificacion, users.eliminarCuenta)
router.get("/navbarmodi", autentificacion, users.navbar)
router.get("/modiUsuContrase",autentificacion, users.modiUsuContrase)
router.get("/bienvenida", autentificacion, users.bienvenida)
router.post("/nuevaContrase",autentificacion, validacionContrase, users.nuevaContrase)
router.get("/pedirUsuarios",autentificacion,autentificacionTitular, users.pedirUsuarios)
router.get("/modi/:_id",autentificacion, users.modiId)
router.post("/envioModificacionTitular",autentificacion,validacionModiTitular, users.envioModificacionTitular)/* Poner validador */
router.get("/eliminarTitular/:_id",autentificacion, users.eliminarTitular)

module.exports=router