const express = require ("express")
const app= express();
const PORT=3000
const hbs= require("express-handlebars")
const router= require ("./rutas/rutas.js")



app.listen(PORT, (err)=>{
    err ? console.log(`Error: ${err}`):
    console.log(`Servidor Corriendo en http://localhost:${PORT}`);
})

app.use(express.urlencoded())

app.use(express.static("public"))

app.engine (".hbs", hbs.engine ({ extname: "hbs"}))
app.set("view engine", "hbs")
app.set ("views", "./views")


app.get("/", (req, res)=>{
    res.render("home")
})

app.post("/contacto", router)

app.get("*", (req, res)=>{
    res.render("noAutorizado")
})
