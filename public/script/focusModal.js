var myModal = document.getElementById('login')
var myInput = document.getElementById('exampleInputEmail1')


myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

var myModal2 = document.getElementById('registro')
  var myInput2 = document.getElementById('nombreRegistro')

myModal2.addEventListener('shown.bs.modal', function () {
  myInput2.focus()
})

var myModal3 = document.getElementById('contacto')
  var myInput3 = document.getElementById('nombreContacto')

myModal3.addEventListener('shown.bs.modal', function () {
  myInput3.focus()
})