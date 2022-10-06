const {body}=require ("express-validator")

const ReglasDeValidacion=[
    body('nombre')
    .notEmpty().withMessage(":Debe ingresar su nombre")
    .isLength({ min:2, max:30}).withMessage(':minimamente de 3 letras')
    .trim(" "),
    body('apellido')
    .notEmpty().withMessage(":Debe ingresar su apellido")
    .isLength({ min:2, max:30}).withMessage('*minimamente de 3 letras')
    .trim(" "),
    body('email')
    .notEmpty().withMessage(":Debe ingresar su email")
    .trim(" ")
    .isEmail().withMessage(":Debe ingresar email valido"),
    body('whatsapp')
    .notEmpty().withMessage(":Debe ingresar su whatsapp")
    .trim(" ")
    .isNumeric().withMessage(":Solo valores númericos")



]






module.exports=ReglasDeValidacion
