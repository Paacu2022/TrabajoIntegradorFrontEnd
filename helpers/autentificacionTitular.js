function autentificacionTitular (req, res, next) {
    if (req.session.user.email === "paacu21@hotmail.com"){
        next ()
    }else res.render("noAutorizado", {usuario:req.session.user})
}

module.exports= autentificacionTitular







