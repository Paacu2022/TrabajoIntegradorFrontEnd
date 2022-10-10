const {body, validationResult}=require ("express-validator")

const validacionRegistro=[
    body('nombreRegistro')
    .notEmpty().withMessage("Nombre no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    (req, res, next)=>{
        const errors= validationResult(req)
    if (!errors.isEmpty()){
        let prueba=[]
      const datosFormulario=req.body
       prueba=errors.array()

      
      res.render ("registracion", {prueba, datosFormulario})
      
  }
    else return next() 
    }

]






module.exports=validacionRegistro
