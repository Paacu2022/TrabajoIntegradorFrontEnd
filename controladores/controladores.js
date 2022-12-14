const nodemailer= require ("nodemailer")
const securepass=require("../helpers/bcrypt")
const User= require("../Esquemas/esquemaUsuarios");
const Usuarios = require("../Esquemas/esquemaUsuarios");
const transport= require ("../configuraciones/nodemailer")



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
     
    res.render("contacto", {confirmacion, usuario: req.session.user})

  
}

    /*MOSTRAMOS EL INGRESO AL LOGIN*/
    function login (req,res) {
      res.render("login")
    }

    /*MOSTRAMOS EL FORMULARIO DE REGISTRACION*/
    function registracion (req,res) {
     
      res.render("registracion", {usuario: req.app.locals.usuario})
    }

    /*ENVIAMOS EL FORMULARIO DE REGISTRACION*/
      async function envioRegistracion (req, res){
      const {nombreRegistro, apellidoRegistro, calleRegistro, alturaRegistro, ciudadRegistro, estadoRegistro, cpRegistro, emailRegistro, contrase├▒aRegistro} = req.body
      const encriptada= await securepass.encriptar(contrase├▒aRegistro)               
      const nuevoUsuario= new User({
        nombreRegistro, apellidoRegistro, calleRegistro, alturaRegistro, ciudadRegistro, estadoRegistro, cpRegistro, emailRegistro, contrase├▒aRegistro: encriptada
      })
      
      nuevoUsuario.save((err)=>{
        if (!err){
          if (req.app.locals.titular){
           
            User.find({}, (err, socios)=>{
              if (err){
                res.send (err)
              } else{
                res.render("usuarios", {socios, usuario: req.session.user})
                
              }
            }).lean()
          }else{
          req.session.user= `${nombreRegistro} ${apellidoRegistro}`
          res.render("bienvenida", {usuario: `${nuevoUsuario.nombreRegistro} ${nuevoUsuario.apellidoRegistro}`})
          }
        }else {
          console.log(err);
          const errorEnMongo=true
          res. render ("registracion", {datosFormulario:req.app.locals.datosFormulario, errorEnMongo})

        }
      })
    }
//Cuando queremos acceder a loguearnos//
    async function envioLogin(req, res){
      const {emailLogin, contrase├▒aLogin}=req.body
      const usuario= await User.find().where({emailRegistro: emailLogin})
      if(!usuario.length){
        return res.render ("login", {mensaje: "Usuario o contrase├▒a incorrectos"})
      } if ( await securepass.desencriptar(contrase├▒aLogin, usuario[0].contrase├▒aRegistro)){
        const usr={
          id: usuario[0]._id,
          nombre: usuario[0].nombreRegistro,
          apellido: usuario[0].apellidoRegistro,
          createdAt: usuario[0].createdAt,
          updatedAt: usuario[0].updatedAt,
          email:usuario[0].emailRegistro
       
        }
        
        if (usuario[0].emailRegistro=== "paacu21@hotmail.com"){
          req.session.user= usr
          req.app.locals.titular=true
          req.app.locals.usuario=true
          res.render ("bienvenida", {titular: req.app.locals.titular, usuario: `${req.session.user.nombre} ${req.session.user.apellido}`})

        }else{
        req.session.user= usr
        res.render ("bienvenida", {usuario: `${req.session.user.nombre} ${req.session.user.apellido}`})
        }

      } else return res.render ("login", {mensaje:"Usuario o contrase├▒a incorrecta"})
    }
  
    //cuando nos deslogueamos//
    function logout (req, res){
      req.session.destroy()
      req.app.locals.titular=false
      req.app.locals.modi=false
      req.app.locals.usuario=false
      res.redirect("/")
    }
//cuando solicitamos la modificacion de datos personales//
    async function modiDatosPersonales (req, res){
      const user = await User.findById(req.session.user.id).lean()
      res.render ("modiDatosPersonales", {user, usuario: `${req.session.user.nombre} ${req.session.user.apellido}`} )
    }
    
    async function envioModificacion (req, res){
     
      try{
        const user = await User.findByIdAndUpdate(req.session.user.id, {nombreRegistro: req.body.nombreRegistro, apellidoRegistro: req.body.apellidoRegistro, calleRegistro: req.body.calleRegistro, alturaRegistro: req.body.alturaRegistro, ciudadRegistro: req.body.ciudadRegistro, estadoRegistro: req.body.estadoRegistro, cpRegistro: req.body.cpRegistro })
        modi= true
        res.render ("modiDatosPersonales", {modi, usuario: req.session.user, user})
      } catch (err){
        res.render ("noAutorizado")
      }
    }
    
//cuando eliminamos la cuenta//
     async function eliminarCuenta (req,res){
      try{
      await User.findByIdAndDelete(req.session.user.id)
      req.session.destroy ()
      const eliminar = true 
      res.render("modiDatosPersonales", {eliminar})

    }  catch (err){
      res.send (err)
    }
    }

//cuando activamos el navbar de modificacion de datos//
    function navbar (req, res){
      modi= true
      res.render ("bienvenida", {modi, usuario: `${req.session.user.nombre} ${req.session.user.apellido}`})
    }
//cuando pedimos el formulario de modificacion de contrase├▒a//
    function modiUsuContrase (req, res){
      modi=true
      res.render("modiUsuContrase├▒a", {modi,usuario: req.session.user})
    }

    function bienvenida (req, res){
      res.render("bienvenida", {usuario: `${req.session.user.nombre} ${req.session.user.apellido}` })
    }

//cuando vamos a modificar la contrase├▒a y validamos que la contrase├▒a actual coincida//
   async  function nuevaContrase (req, res, next){
    const datosUsu = await User.findById(req.session.user.id).lean()
    if ( await securepass.desencriptar(req.body.contrase├▒aModi,datosUsu.contrase├▒aRegistro)){
      
                if (req.body.contrasenueva1 !== req.body.contrasenueva2){
      
                res.render ("modiUsuContrase├▒a", {coinciden: "Las contrase├▒as Nuevas no coiciden" , usuario: req.session.user, contra: datosUsu.contrase├▒aRegistro,}) 
      }else{
        async function encriptar (){
          const encriptada= await securepass.encriptar(req.body.contrasenueva1)
        

        async function modicontrase (){
          try{
          await User.findByIdAndUpdate(req.session.user.id, {contrase├▒aRegistro: encriptada })
          modificada=true
          modi=true
          res.render ("modiUsuContrase├▒a", {modificada,modi,  usuario: req.session.user}) 
          } catch (err){
          res.render ("noAutorizado")
          } }
          modicontrase ()                         }
          encriptar()
        
      }
    }else{
      const modi=true
      res.render ("modiUsuContrase├▒a", {modi, mensaje: "Contrase├▒a Incorrecta", usuario: req.session.user})
    }

    }
  

//pedir todos los registros de usuarios//
function pedirUsuarios (req, res){
  req.app.locals.titular=true
      User.find({}, (err, socios)=>{
        if (err){
          res.send (err)
        } else{
          res.render("usuarios", {socios, titular:req.app.locals.titular , usuario: req.session.user})
          
        }
      }).lean()
} 
    //Cuando el titular pone editar en un registro//
    async function modiId (req, res){
      const user = await User.findById(req.params._id).lean()
     req.app.locals.id = req.params._id
    res.render ("modiXTitular", {user, usuario: req.session.user} )
    }
      
  //si el titular quiere modificar un registro de usuario//
    async function envioModificacionTitular (req, res){
      try{
        await User.findByIdAndUpdate(req.app.locals.id, {nombreRegistro: req.body.nombreRegistro, apellidoRegistro: req.body.apellidoRegistro, calleRegistro: req.body.calleRegistro, alturaRegistro: req.body.alturaRegistro, ciudadRegistro: req.body.ciudadRegistro, estadoRegistro: req.body.estadoRegistro, cpRegistro: req.body.cpRegistro})
        User.find({}, (err, socios)=>{
          if (err){
            res.send (err)
          } else{
            res.render("usuarios", {socios, usuario: req.session.user})
            
          }
        }).lean()
        
      } catch (err){
        res.render ("noAutorizado")
      }
    }
     
//Si el titular quiere eliminar un registro de usuario//
    async function eliminarTitular (req, res){
      try{
        await User.findByIdAndDelete(req.params._id)
        User.find({}, (err, socios)=>{
          if (err){
            res.send (err)
          } else{
            eliminar=true
            res.render("usuarios", {eliminar, socios, usuario: req.session.user})
            
          }
        }).lean()
  
      }  catch (err){
        res.send (err)
      }
      }
    



     
    



module.exports={envioFormulario, formulario, login, registracion, envioRegistracion, envioLogin, logout, envioModificacion, eliminarCuenta, navbar, modiDatosPersonales, modiUsuContrase, bienvenida, nuevaContrase, pedirUsuarios, modiId, envioModificacionTitular, eliminarTitular}