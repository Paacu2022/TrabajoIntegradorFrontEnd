const transport= require("../configuraciones/nodemailer")
const securepass=require("../helpers/bcrypt")
const User= require("../Esquemas/esquemaUsuarios")


/*MOSTRAMOS EL FORMULARIO DE CONTACTO*/
function formulario (req,res) {
  res.render("contacto", {usuario: req.session.user})
}

/*ENVIAMOS EL MAIL DEL FORMULARIO DE CONTACTO*/
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

    /*MOSTRAMOS EL INGRESO AL LOGIN*/
    function login (req,res) {
      res.render("login")
    }

    /*MOSTRAMOS EL FORMULARIO DE REGISTRACION*/
    function registracion (req,res) {
      res.render("registracion", )
    }

    /*ENVIAMOS EL FORMULARIO DE REGISTRACION*/
      async function envioRegistracion (req, res){
      const {nombreRegistro, apellidoRegistro, calleRegistro, alturaRegistro, ciudadRegistro, estadoRegistro, cpRegistro, emailRegistro, contraseñaRegistro} = req.body
      const encriptada= await securepass.encriptar(contraseñaRegistro)               
      const nuevoUsuario= new User({
        nombreRegistro, apellidoRegistro, calleRegistro, alturaRegistro, ciudadRegistro, estadoRegistro, cpRegistro, emailRegistro, contraseñaRegistro: encriptada
      })
      
      /*const usr={
        id: nuevoUsuario[0]._id,
        nombreRegistro: nuevoUsuario[0].nombreRegistro,
        apellidoRegistro: nuevoUsuario[0].apellidoRegistro
      }*/ 
      nuevoUsuario.save((err)=>{
        if (!err){
          req.session.user= `${nombreRegistro} ${apellidoRegistro}`
          res.render("conectado", {usuario: req.session.user})
  
        }else {
          console.log(err);
        }
      })
    }

    async function envioLogin(req, res){
      const {emailLogin, contraseñaLogin}=req.body
      const usuario= await User.find().where({emailRegistro: emailLogin})
      if(!usuario.length){
        return res.render ("login", {mensaje: "Usuario o contraseña incorrectos"})
      } if ( await securepass.desencriptar(contraseñaLogin, usuario[0].contraseñaRegistro)){
        req.session.user=`${usuario[0].nombreRegistro} ${usuario[0].apellidoRegistro}`
        res.render ("conectado", {usuario: req.session.user})

      } else return res.render ("login", {mensaje:"Usuario o contraseña incorrecta"})
    }
  
    function logout (req, res){
      req.session.destroy()
      res.redirect("/")
    }

    async function modificacion (req, res){
      const user = await User.findById(req.session.user.id).lean()
      console.log({usuario: req.session.user});
      res.render ("modificacion", {usuario: req.session.user} )
    }
    

module.exports={envioFormulario, formulario, login, registracion, envioRegistracion, envioLogin, logout, modificacion}