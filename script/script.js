// ==============================
// URL DE LA API
// ==============================
const API_URL = "https://pagina-donaciones-production.up.railway.app";
 
// ==============================
// DATOS INICIALES
// ==============================
let donaciones = [];
 
// ==============================
// TEMA 23: ANIMACIONES
// ==============================
function mostrarAnimaciones(){
  const elementos = document.querySelectorAll(".animar");
 
  elementos.forEach(function(elemento){
    const posicion = elemento.getBoundingClientRect().top;
    const altoPantalla = window.innerHeight;
 
    if(posicion < altoPantalla - 80){
      elemento.classList.add("visible");
    }
  });
}
 
window.addEventListener("scroll", mostrarAnimaciones);
window.addEventListener("load", mostrarAnimaciones);
mostrarAnimaciones();
 
 
// ==============================
// TEMA 16 Y 28: FORMULARIO + API
// ==============================
const formDonacion = document.getElementById("form-donacion");
 
if(formDonacion){
  formDonacion.addEventListener("submit", async function(e){
    e.preventDefault();
 
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const tipo = document.getElementById("tipo").value;
    const monto = Number(document.getElementById("monto").value);
    const mensaje = document.getElementById("mensaje").value.trim();
    const terminos = document.getElementById("terminos").checked;
 
    if(nombre === "" || correo === "" || telefono === "" || ciudad === "" || tipo === "" || monto <= 0){
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
 
    if(!terminos){
      alert("Debes aceptar el uso de la información.");
      return;
    }
 
    const nuevaDonacion = { nombre, correo, telefono, ciudad, tipo, monto, mensaje };
 
    const response = await fetch(`${API_URL}/api/donaciones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaDonacion)
    });
 
    if(response.ok){
      document.getElementById("mensaje-guardado").innerText =
        "Donación registrada correctamente. ¡Gracias por tu apoyo!";
      formDonacion.reset();
      cargarDonaciones();
    }
  });
}
 
 
// ==============================
// CARGAR DONACIONES DESDE LA API
// ==============================
async function cargarDonaciones(){
  try {
    const res = await fetch(`${API_URL}/api/donaciones`);
    donaciones = await res.json();
    renderizarDonaciones();
  } catch(error) {
    console.error("Error al cargar donaciones:", error);
  }
}
 
cargarDonaciones();
 
 
// ==============================
// RENDERIZAR PANEL DE DONACIONES
// ==============================
function renderizarDonaciones(){
  const tabla = document.getElementById("tabla-donaciones");
  const totalDonaciones = document.getElementById("total-donaciones");
  const totalRecaudado = document.getElementById("total-recaudado");
 
  if(!tabla) return;
 
  tabla.innerHTML = "";
 
  let suma = 0;
 
  donaciones.forEach(function(donacion){
    suma += Number(donacion.monto);
 
    const fila = document.createElement("tr");
 
    fila.innerHTML = `
      <td>${donacion.nombre}</td>
      <td>${donacion.tipo}</td>
      <td><span class="tag entregado">$${Number(donacion.monto).toLocaleString("es-CO")}</span></td>
    `;
 
    tabla.appendChild(fila);
  });
 
  totalDonaciones.textContent = donaciones.length;
  totalRecaudado.textContent = "$" + suma.toLocaleString("es-CO");
}
 
 
// ==============================
// BUSCAR DONACIÓN
// ==============================
const btnBuscar = document.getElementById("btn-buscar");
 
if(btnBuscar){
  btnBuscar.addEventListener("click", async function(){
    const nombreBuscar = document.getElementById("donante-buscar").value.trim();
    const resultado = document.getElementById("resultado-busqueda");
 
    try {
      const res = await fetch(`${API_URL}/api/donaciones/buscar?nombre=${nombreBuscar}`);
 
      if(!res.ok){
        resultado.innerHTML = "No se encontró ninguna donación con ese nombre.";
        return;
      }
 
      const donacion = await res.json();
 
      resultado.innerHTML = `
        <strong>Donante:</strong> ${donacion.nombre}<br>
        <strong>Tipo de donación:</strong> ${donacion.tipo}<br>
        <strong>Monto aproximado:</strong> $${Number(donacion.monto).toLocaleString("es-CO")}<br>
        <strong>Mensaje:</strong> ${donacion.mensaje || "Sin mensaje registrado."}
      `;
    } catch(error) {
      resultado.innerHTML = "Error al buscar la donación.";
    }
  });
}
 
 
// ==============================
// TEMA 25: CANVAS
// ==============================
const canvas = document.getElementById("canvas-flujo");
 
if(canvas){
  const ctx = canvas.getContext("2d");
  let dibujando = false;
 
  canvas.addEventListener("mousedown", function(){
    dibujando = true;
  });
 
  canvas.addEventListener("mouseup", function(){
    dibujando = false;
    ctx.beginPath();
  });
 
  canvas.addEventListener("mousemove", function(e){
    if(!dibujando) return;
 
    const rect = canvas.getBoundingClientRect();
 
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#007a87";
 
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
 
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  });
 
  const limpiar = document.getElementById("limpiar-canvas");
 
  if(limpiar){
    limpiar.addEventListener("click", function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }
}
 
 
// ==============================
// TEMA 27 Y 28: CONTENIDO EDITABLE + LOCALSTORAGE
// ==============================
const notas = document.getElementById("notas-equipo");
const btnNotas = document.getElementById("guardar-notas");
 
if(notas){
  const notasGuardadas = localStorage.getItem("mensajeCampaña");
 
  if(notasGuardadas){
    notas.innerText = notasGuardadas;
  }
}
 
if(btnNotas){
  btnNotas.addEventListener("click", function(){
    localStorage.setItem("mensajeCampaña", notas.innerText);
    alert("Mensaje guardado correctamente.");
  });
}