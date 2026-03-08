document.getElementById("form-donacion").addEventListener("submit", function(e){
  e.preventDefault();

  const monto = document.getElementById("monto").value;
  const nombre = document.getElementById("nombre").value;

  if(!monto || monto <= 0){
    alert("Por favor ingresa un monto válido.");
    return;
  }

  if(!nombre.trim()){
    alert("Por favor ingresa tu nombre.");
    return;
  }

  alert("¡Gracias por tu donación, " + nombre + "! (Demo)");
});