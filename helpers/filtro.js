const Handlebars = require("handlebars");


Handlebars.registerHelper ("filtro", function (arrayErrors, name) {
  if (arrayErrors !== undefined){
    let listado= []
    arrayErrors.forEach(campo=>{
      if (campo.param===name){
          listado+=campo.msg; 
        /*return listado.push(campo.msg); */}})
            return listado; 
      
      }
    })

    
