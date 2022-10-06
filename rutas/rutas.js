const express=require ("express")
const router= express.Router()
const users= require ("../controladores/controladores")
const ReglasDeValidacion= require ("../validaciones/reglasDeValidacion")


router.get("/contacto", users.formulario)
router.post("/contacto", ReglasDeValidacion, users.envioFormulario)



    
    
    
    


module.exports=router