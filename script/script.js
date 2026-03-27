// ==============================
// FORMULARIO
// ==============================
document.getElementById("form").addEventListener("submit", function(e){

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const monto = document.getElementById("monto").value;
    const terminos = document.getElementById("terminos").checked;

    // VALIDACIONES
    if(nombre === "" || correo === "" || monto === ""){
        alert("Por favor completa los campos obligatorios");
        e.preventDefault();
        return;
    }

    if(monto <= 0){
        alert("Ingresa un monto válido");
        e.preventDefault();
        return;
    }

    if(!terminos){
        alert("Debes aceptar los términos");
        e.preventDefault();
        return;
    }

    // GUARDAR EN LOCAL STORAGE (TEMA 28)
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
    localStorage.setItem("monto", monto);

    // MENSAJE VISUAL
    document.getElementById("mensaje-guardado").innerText =
    "Datos guardados correctamente ✔";

});


// ==============================
// TEMA 23: ANIMACIONES SCROLL
// ==============================

// 👇 dejamos tu evento pero usamos función
window.addEventListener("scroll", mostrarAnimaciones);
window.addEventListener("load", mostrarAnimaciones);

function mostrarAnimaciones(){

    let elementos = document.querySelectorAll(".animar");

    elementos.forEach(function(el){

        let posicion = el.getBoundingClientRect().top;
        let pantalla = window.innerHeight;

        if(posicion < pantalla - 80){
            el.classList.add("visible");
        }

    });
}


// ==============================
// TEMA 25: CANVAS
// ==============================
const canvas = document.getElementById("canvasDonacion");

if(canvas){
    const ctx = canvas.getContext("2d");
    let dibujando = false;

    canvas.addEventListener("mousedown", () => dibujando = true);
    canvas.addEventListener("mouseup", () => dibujando = false);

    canvas.addEventListener("mousemove", function(e){
        if(!dibujando) return;

        ctx.fillStyle = "#2f6b49";
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}


// ==============================
// CARGAR DATOS (MEJORADO)
// ==============================
window.addEventListener("load", function(){

    const nombreGuardado = localStorage.getItem("nombre");
    const correoGuardado = localStorage.getItem("correo");
    const montoGuardado = localStorage.getItem("monto");

    if(nombreGuardado){
        document.getElementById("nombre").value = nombreGuardado;
    }

    if(correoGuardado){
        document.getElementById("correo").value = correoGuardado;
    }

    if(montoGuardado){
        document.getElementById("monto").value = montoGuardado;
    }

});