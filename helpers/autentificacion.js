function autentificacion (req, res, next) {
    if (req.session.user){
        next ()
    }else res.render("noAutorizado")
}

module.exports= autentificacion