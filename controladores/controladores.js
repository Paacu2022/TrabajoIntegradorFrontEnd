const nodemailer= require ("nodemailer")

function envioFormulario(req,res){
    const {nombre, apellido, email, whatsapp, mensaje}= req.body;
        const emailmensaje ={
           to:"paacu21@hotmail.com",
           from: email,
           asunto: "Mensaje desde Formulario de contacto",
           html: `Contacto de ${nombre} ${apellido} Whatsapp:${whatsapp}: ${mensaje}`
    }
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e5112d31cc78cd",
          pass: "2f83eb880751ec"
        }})

    transport.sendMail(emailmensaje)
    res.render("conectado")
      }

module.exports=envioFormulario
    


