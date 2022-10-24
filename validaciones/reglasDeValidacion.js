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
      
      res.render ("contacto", {arrayErrors, datosFormulario,usuario: req.session.user, user:req.session.user})
      
  }
    else return next() 
    }

]


const validacionModiTitular=[
    body('nombreRegistro')
    .notEmpty().withMessage("Nombre no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('apellidoRegistro')
    .notEmpty().withMessage("Apellido no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('calleRegistro')
    .notEmpty().withMessage("Calle no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('alturaRegistro')
    .notEmpty().withMessage("Altura no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .isNumeric().withMessage(" solo números")
    .trim(" "),
    body('ciudadRegistro')
    .notEmpty().withMessage("Ciudad no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('estadoRegistro')
    .notEmpty().withMessage("Estado no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('cpRegistro')
    .notEmpty().withMessage("Codigo Postal no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    
    async (req, res, next)=>{
        const errors= validationResult(req)
    if (!errors.isEmpty()){
      datosFormulario=req.body
       const errores=errors.array()
      
      res.render ("modiXTitular", {errores, datosFormulario, usuario: req.session.user, user:req.session.user})
      
  }
    else return next() 
    }

]


const validacionDatosPersonales=[
    body('nombreRegistro')
    .notEmpty().withMessage("Nombre no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('apellidoRegistro')
    .notEmpty().withMessage("Apellido no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('calleRegistro')
    .notEmpty().withMessage("Calle no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('alturaRegistro')
    .notEmpty().withMessage("Altura no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .isNumeric().withMessage(" solo números")
    .trim(" "),
    body('ciudadRegistro')
    .notEmpty().withMessage("Ciudad no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('estadoRegistro')
    .notEmpty().withMessage("Estado no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    body('cpRegistro')
    .notEmpty().withMessage("Codigo Postal no puede estar vacio ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    
    async (req, res, next)=>{
        const errors= validationResult(req)
    if (!errors.isEmpty()){
      datosFormulario=req.body
       const errores=errors.array()
      
      res.render ("modiDatosPersonales", {errores, datosFormulario, usuario: req.session.user, user:req.session.user })
      
  }
    else return next() 
    }

]




module.exports={ReglasDeValidacion, validacionModiTitular, validacionDatosPersonales}
