const express = require ("express")
const app= express();
const PORT=4000
const hbs= require("express-handlebars");
const { create } = require("handlebars");
require ("./configuraciones/mongo")

const rutas=require("./rutas/rutas")

const session= require("express-session")

const handle= create ({ helpers: require ("./helpers/filtro"),
                        helpers: require("./helpers/masuno")})


app.listen(PORT, (err)=>{
    err ? console.log(`Error: ${err}`):
    console.log(`Servidor Corriendo en http://localhost:${PORT}`);
})

app.use(express.urlencoded())

app.use( session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(express.static("public"))

 app.locals.titular
 app.locals.id
 app.locals.modi

app.engine (".hbs", hbs.engine ({ extname: "hbs" }))
app.set("view engine", "hbs")
app.set ("views", "./views")


app.get("/", (req, res)=>{
    res.render("home",{usuario: req.session.user, titular: req.app.locals.titular })
})

app.use("/", rutas)

app.get("*", (req, res)=>{
    res.render("noAutorizado", {usuario: req.session.user})
})
