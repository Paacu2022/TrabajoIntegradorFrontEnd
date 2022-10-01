const express=require ("express")
const router= express.Router()
const envioFormulario= require ("../controladores/controladores")



router.post("/contacto", envioFormulario)



    
    
    
    


module.exports=router