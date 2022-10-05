const express=require ("express")
const router= express.Router()
const users= require ("../controladores/controladores")


router.get("/contacto", users.formulario)
router.post("/contacto", users.envioFormulario)



    
    
    
    


module.exports=router