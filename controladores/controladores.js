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
      confirmacion= "Hubo un error y no se pudo enviar el formulario"
      console.log(confirmacion);
    }else {
      confirmacion=true
      
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
        const usr={
          id: usuario[0]._id,
          nombre: usuario[0].nombreRegistro,
          apellido: usuario[0].apellidoRegistro,
          /*calle: usuario[0].calleRegistro,
          altura: usuario[0].alturaRegistro,
          ciudad: usuario[0].ciudadRegistro,
          estado: usuario[0].estadoRegistro,
          cp: usuario[0].cpRegistro,*/
        }

        req.session.user= usr
        res.render ("bienvenida", {usuario: `${req.session.user.nombre} ${req.session.user.apellido}`})

      } else return res.render ("login", {mensaje:"Usuario o contraseña incorrecta"})
    }
  
    function logout (req, res){
      req.session.destroy()
      res.redirect("/")
    }

    async function modificacion (req, res){
      const user = await User.findById(req.session.user.id).lean()
      res.render ("modificacion", {user, usuario: `${req.session.user.nombre} ${req.session.user.apellido}`} )
    }
    
    async function envioModificacion (req, res){
      try{
        await User.findByIdAndUpdate(req.session.user.id, {nombreRegistro: req.body.nombreRegistro, apellidoRegistro: req.body.apellidoRegistro, calleRegistro: req.body.calleRegistro, alturaRegistro: req.body.alturaRegistro, ciudadRegistro: req.body.ciudadRegistro, estadoRegistro: req.body.estadoRegistro, cpRegistro: req.body.cpRegistro })
        const modi= true
        res.render ("modificacion", {modi})
      } catch (err){
        res.render ("noAutorizado")
      }
    }
    

     async function eliminarCuenta (req,res){
    try{
      await User.findByIdAndDelete(req.session.user.id)
      req.session.destroy ()
      res.send("REGISTRO ELIMINADO ")
    }  catch (err){
      res.render ("modificacion")
    }
    
    
    
    }

module.exports={envioFormulario, formulario, login, registracion, envioRegistracion, envioLogin, logout, modificacion, envioModificacion, eliminarCuenta}