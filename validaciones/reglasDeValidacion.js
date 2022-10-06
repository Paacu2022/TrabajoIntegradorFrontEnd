const {body}=require ("express-validator")

const ReglasDeValidacion=[
    body('nombre')
    .notEmpty().withMessage("Nombre ")
    .isLength({ min:2, max:30}).withMessage(" obligatorio, minimo 3 caracteres")
    .trim(" "),
    body('apellido')
    .notEmpty().withMessage("Apellido ")
    .isLength({ min:2, max:30}).withMessage(' obligatorio, minimo 3 caracteres')
    .trim(" "),
    body('email')
    .notEmpty().withMessage("Email ")
    .trim(" ")
    .isEmail().withMessage(" obligatorio. Formato invalido"),
    body('whatsapp')
    .notEmpty().withMessage("Whatsapp obligatorio ")
    .trim(" ")
    .isNumeric().withMessage(" solo números")



]






module.exports=ReglasDeValidacion
