const {body, validationResult}=require ("express-validator")

const validacionRegistro=[
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
    body('emailRegistro')
    .notEmpty().withMessage("Email no puede estar vacio ")
    .isEmail().withMessage("Formato invalido")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" ")
    .custom ((value, {req} )=>{
        if ( value !== req.body.email2Registro){
            throw new Error ("Los Emails no coinciden")
        } return true
    }
    )
    ,
    body('email2Registro')
    .notEmpty().withMessage("Confirmar su Email no puede quedar vacio ")
    .isEmail().withMessage("Formato invalido")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" ")
    .custom ((value, {req} )=>{
        if ( value !== req.body.emailRegistro){
            throw new Error ("Los Emails no coinciden")
        } return true
    }
    ),
    body('contraseñaRegistro')
    .notEmpty().withMessage("Debe ingresar su contraseña")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" ")
    .custom ((value, {req} )=>{
        if ( value !== req.body.contraseña2Registro){
            throw new Error ("Las Contraseñas no coinciden")
        } return true
    }
    ),
    body('contraseña2Registro')
    .custom ((value, {req} )=>{
        if ( value !== req.body.contraseñaRegistro){
            throw new Error ("Las Contraseñas no coinciden")
        } return true
    }
    )
    .notEmpty().withMessage("Debe confirmar su contraseña")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),



    (req, res, next)=>{
        const errors= validationResult(req)
    if (!errors.isEmpty()){
      const datosFormulario=req.body
      errores=errors.array()

      
      res.render ("registracion", {errores, datosFormulario})
      
  }
    else return next() 
    }

]


const validacionContrase=[
    body('contrasenueva1')
    .notEmpty().withMessage("La Contraseña no puede estar vacia ")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
 
    body('contrasenueva2')
    .notEmpty().withMessage("Debe confirmar la misma Contraseña")
    .isLength({ min:2, max:30}).withMessage(" Debe contener minimamente 2 caracteres")
    .trim(" "),
    (req, res, next)=>{
        const errors= validationResult(req)
    if (!errors.isEmpty()){
 
      errores=errors.array()

      const modi=true
      res.render ("modiUsuContraseña", {errores, modi, usuario: req.session.user})
      
  }
    else return next() 
    }

]






module.exports={validacionRegistro, validacionContrase}
