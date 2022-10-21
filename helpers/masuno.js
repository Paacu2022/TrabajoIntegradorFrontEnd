const Handlebars = require("handlebars");



Handlebars.registerHelper ("masuno", function (valor){
    return parseInt (valor + 1)
})