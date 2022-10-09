require ("dotenv").config()
const mongoose= require ("mongoose")
const URI=process.env.db_uri

mongoose.connect(URI, (err)=>{
    err? console.log(err): console.log("MONGO ATLAS CONECTADO OK!!!!");;
})