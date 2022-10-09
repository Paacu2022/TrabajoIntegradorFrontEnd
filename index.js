const express = require ("express")
const app= express();
const PORT=3000
const hbs= require("express-handlebars");
const { create } = require("handlebars");
require ("./configuraciones/mongo")

const rutas=require("./rutas/rutas")

const handle= create ({ helpers: require ("./helpers/filtro"),
                        /*helpers: require("./helpers/alerta")*/})


app.listen(PORT, (err)=>{
    err ? console.log(`Error: ${err}`):
    console.log(`Servidor Corriendo en http://localhost:${PORT}`);
})

app.use(express.urlencoded())

app.use(express.static("public"))



app.engine (".hbs", hbs.engine ({ extname: "hbs" }))
app.set("view engine", "hbs")
app.set ("views", "./views")


app.get("/", (req, res)=>{
    res.render("home")
})

app.use("/", rutas)

app.get("*", (req, res)=>{
    res.render("noAutorizado")
})
