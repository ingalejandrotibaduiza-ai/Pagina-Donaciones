document.getElementById("form-donacion").addEventListener("submit", function(e){
  e.preventDefault();

  const monto = document.getElementById("monto").value;

  if (!monto || monto <= 0) {
    alert("Por favor ingresa un monto válido.");
    return;
  }

  alert("¡Gracias por tu donación! (Demo)");
});