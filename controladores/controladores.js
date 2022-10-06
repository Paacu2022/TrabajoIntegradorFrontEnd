const transport= require("../configuraciones/nodemailer")
const {validationResult}=require ("express-validator")


function formulario (req,res) {
  res.render("contacto")
}

async function envioFormulario (req,res){
    const errors= validationResult(req)
    if (!errors.isEmpty()){
      const datosFormulario=req.body
      const arrayErrors=errors.array()
    
      res.render ("contacto", {arrayErrors, datosFormulario})
    
    }else{
    const {nombre, apellido, email, whatsapp, mensaje}= req.body;
        const emailmensaje ={
           to:"paacu21@hotmail.com",
           from: email,
           subject: "Mensaje desde Formulario de contacto",
           html: `Contacto de ${nombre} ${apellido} Whatsapp:${whatsapp}: ${mensaje}`
    }
    

    const sendMailStatus = await transport.sendMail(emailmensaje);
    let confirmacion=""
    if (sendMailStatus.rejected.length){
      confirmacion= "Ocurrio un error y el formulario no se pudo enviar"
    }else {
      confirmacion="El formulario se envio y se recibio con Éxito"
    }
    res.render("contacto",{mensaje: confirmacion})
    
    
    }}


module.exports={envioFormulario, formulario}