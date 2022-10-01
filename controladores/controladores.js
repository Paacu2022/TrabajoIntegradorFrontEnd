const nodemailer= require ("nodemailer")


async function envioFormulario (req,res){
    const {nombre, apellido, email, whatsapp, mensaje}= req.body;
        const emailmensaje ={
           to:"paacu21@hotmail.com",
           from: email,
           subject: "Mensaje desde Formulario de contacto",
           html: `Contacto de ${nombre} ${apellido} Whatsapp:${whatsapp}: ${mensaje}`
    }
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e5112d31cc78cd",
          pass: "2f83eb880751ec"
        }})

    const sendMailStatus = await transport.sendMail(emailmensaje);
    if (sendMailStatus.rejected.length){
      res.render("noAutorizado")
    }else {
      res.render("noAutorizado")
    }
    }

    
      

module.exports=envioFormulario
    


