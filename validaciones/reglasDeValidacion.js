const {body, validationResult}=require ("express-validator")



const ReglasDeValidacion=[
    body('nombre')
    .notEmpty().withMessage("Nombre obligatorio")
    .isLength({ min:2, max:30}).withMessage("minimo 3 caracteres")
    .trim(" "),
    body('apellido')
    .notEmpty().withMessage("Apellido Obligatorio")
    .isLength({ min:2, max:30}).withMessage('minimo 3 caracteres')
    .trim(" "),
    body('email')
    .notEmpty().withMessage("Email Obligatorio")
    .trim(" ")
    .isEmail().withMessage("Formato invalido"),
    body('whatsapp')
    .notEmpty().withMessage("Whatsapp obligatorio ")
    .trim(" ")
    .isNumeric().withMessage(" solo números"),
    (req, res, next)=>{
        const errors= validationResult(req)
    if (!errors.isEmpty()){
      const datosFormulario=req.body
      const arrayErrors=errors.array()
      
      res.render ("contacto", {arrayErrors, datosFormulario})
      
  }
    else return next() 
    }

]






module.exports=ReglasDeValidacion
