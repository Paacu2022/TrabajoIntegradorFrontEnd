const transport= require("../configuraciones/nodemailer")
const securepass=require("../helpers/bcrypt")
const User= require("../Esquemas/esquemaUsuarios")



function formulario (req,res) {
  res.render("contacto")
}

async function envioFormulario (req,res){

    const {nombre, apellido, email, whatsapp, mensaje}= req.body;
        const emailmensaje ={
           to:"paacu21@hotmail.com",
           from: email,
           subject: "Mensaje desde Formulario de contacto",
           html: `Contacto de ${nombre} ${apellido} Whatsapp:${whatsapp}: ${mensaje}`
    }
    

    const sendMailStatus = await transport.sendMail(emailmensaje);
    if (sendMailStatus.rejected.length){
      confirmacion= "Ocurrio un error y el formulario no se pudo enviar"
    }else {
      confirmacion="El formulario se envio y se recibio con Éxito"
      }
     
    res.render("contacto", {confirmacion})
    
    }

    function login (req,res) {
      res.render("login")
    }

    function registracion (req,res) {
      res.render("registracion")
    }



      async function envioRegistracion (req, res){
      const {nombreRegistro, apellidoRegistro, calleRegistro, alturaRegistro, ciudadRegistro, estadoRegistro, cpRegistro, emailRegistro, contraseñaRegistro} = req.body
      const encriptada= await securepass.encriptar(contraseñaRegistro)               
      const nuevoUsuario= new User({
        nombreRegistro, apellidoRegistro, calleRegistro, alturaRegistro, ciudadRegistro, estadoRegistro, cpRegistro, emailRegistro, contraseñaRegistro: encriptada
      })
      nuevoUsuario.save((err)=>{
        if (!err){
          req.session.user= `${nombreRegistro} ${apellidoRegistro}`
          res.render("conectado", {usuario: req.session.user})
        }else {
          console.log(err);
        }
      })
    }
  
    

module.exports={envioFormulario, formulario, login, registracion, envioRegistracion}