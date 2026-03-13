document.getElementById("form-donacion").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const monto = document.getElementById("monto").value;
    const terminos = document.getElementById("terminos").checked;

    if (nombre === "" || correo === "" || monto === "") {
        alert("Por favor completa los campos obligatorios.");
        return;
    }

    if (monto <= 0) {
        alert("Por favor ingresa un monto válido.");
        return;
    }

    if (!terminos) {
        alert("Debes aceptar los términos y condiciones.");
        return;
    }

    alert("¡Gracias por tu donación!");
});