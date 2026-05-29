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
// PANEL DE ADMINISTRACIÓN - PAQUETES
// ==============================

// Cargar repartidores en el select
async function cargarRepartidores(){
  try {
    const res = await fetch(`${API_URL}/api/repartidores`);
    const repartidores = await res.json();
    const select = document.getElementById("repartidorAsignar");
    if(!select) return;
    select.innerHTML = '<option value="Sin asignar">Sin asignar</option>';
    repartidores.forEach(r => {
      const op = document.createElement("option");
      op.value = r.nombre;
      op.textContent = r.nombre + " (" + r.vehiculo + ")";
      select.appendChild(op);
    });
  } catch(error) {
    console.error("Error al cargar repartidores:", error);
  }
}

cargarRepartidores();

// Registrar nuevo paquete
const btnRegistrarPaquete = document.getElementById("btn-registrar-paquete");

if(btnRegistrarPaquete){
  btnRegistrarPaquete.addEventListener("click", async function(){
    const remitente = document.getElementById("remitente").value.trim();
    const destinatario = document.getElementById("destinatario").value.trim();
    const direccionDestino = document.getElementById("direccionDestino").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const dimensiones = document.getElementById("dimensiones").value.trim();
    const repartidor = document.getElementById("repartidorAsignar").value;
    const estado = document.getElementById("estadoPaquete").value;

    if(!remitente || !destinatario || !direccionDestino){
      alert("Por favor completa remitente, destinatario y dirección.");
      return;
    }

    const nuevoPaquete = { remitente, destinatario, direccionDestino, peso, dimensiones, repartidor, estado };

    const res = await fetch(`${API_URL}/api/paquetes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPaquete)
    });

    if(res.ok){
      const data = await res.json();
      document.getElementById("mensaje-paquete").innerText =
        "✅ Paquete registrado. Número de guía: " + data.paquete.numeroGuia;
      document.getElementById("remitente").value = "";
      document.getElementById("destinatario").value = "";
      document.getElementById("direccionDestino").value = "";
      document.getElementById("peso").value = "";
      document.getElementById("dimensiones").value = "";
      cargarPaquetes();
    } else {
      alert("Error al registrar el paquete.");
    }
  });
}

// Cargar tabla de paquetes
async function cargarPaquetes(){
  try {
    const res = await fetch(`${API_URL}/api/paquetes`);
    const paquetes = await res.json();
    const tbody = document.getElementById("tabla-paquetes");
    if(!tbody) return;

    tbody.innerHTML = "";

    paquetes.forEach(p => {
      const fila = document.createElement("tr");

      let tagClass = "bodega";
      if(p.estado === "En ruta") tagClass = "ruta";
      if(p.estado === "Entregado") tagClass = "entregado";
      if(p.estado === "Incidencia") tagClass = "incidencia";

      fila.innerHTML = `
        <td><strong>${p.numeroGuia}</strong></td>
        <td>${p.remitente}</td>
        <td>${p.destinatario}</td>
        <td><span class="tag ${tagClass}">${p.estado}</span></td>
        <td>${p.repartidor}</td>
        <td>
          <select onchange="actualizarEstado('${p._id}', this.value)">
            <option value="En bodega" ${p.estado === "En bodega" ? "selected" : ""}>En bodega</option>
            <option value="En ruta" ${p.estado === "En ruta" ? "selected" : ""}>En ruta</option>
            <option value="Entregado" ${p.estado === "Entregado" ? "selected" : ""}>Entregado</option>
            <option value="Incidencia" ${p.estado === "Incidencia" ? "selected" : ""}>Incidencia</option>
          </select>
        </td>
      `;
      tbody.appendChild(fila);
    });
  } catch(error) {
    console.error("Error al cargar paquetes:", error);
  }
}

cargarPaquetes();

// Actualizar estado de paquete
async function actualizarEstado(id, nuevoEstado){
  try {
    await fetch(`${API_URL}/api/paquetes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado })
    });
    cargarPaquetes();
  } catch(error) {
    console.error("Error al actualizar estado:", error);
  }
}


// ==============================
// MAPA DE REPARTIDORES (ADMIN)
// ==============================
let mapaAdmin = null;
let marcadoresAdmin = {};

async function iniciarMapaAdmin(){
  const contenedor = document.getElementById("mapa-admin");
  if(!contenedor) return;

  if(!mapaAdmin){
    mapaAdmin = L.map("mapa-admin").setView([4.6097, -74.0817], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap"
    }).addTo(mapaAdmin);
  }

  actualizarMapaAdmin();
}

async function actualizarMapaAdmin(){
  try {
    const res = await fetch(`${API_URL}/api/repartidores/ubicaciones`);
    const ubicaciones = await res.json();

    ubicaciones.forEach(r => {
      if(marcadoresAdmin[r._id]){
        marcadoresAdmin[r._id].setLatLng([r.lat, r.lng]);
        marcadoresAdmin[r._id].setPopupContent(`🛵 ${r.nombre}<br>${r.vehiculo}`);
      } else {
        const marcador = L.marker([r.lat, r.lng])
          .addTo(mapaAdmin)
          .bindPopup(`🛵 ${r.nombre}<br>${r.vehiculo}`);
        marcadoresAdmin[r._id] = marcador;
      }
    });
  } catch(error) {
    console.error("Error al actualizar mapa:", error);
  }
}

// Iniciar mapa cuando el elemento esté visible
const observador = new IntersectionObserver(function(entries){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      iniciarMapaAdmin();
      observador.disconnect();
    }
  });
});

const mapaAdminEl = document.getElementById("mapa-admin");
if(mapaAdminEl) observador.observe(mapaAdminEl);

// Botón actualizar mapa
const btnActualizarMapa = document.getElementById("btn-actualizar-mapa");
if(btnActualizarMapa){
  btnActualizarMapa.addEventListener("click", actualizarMapaAdmin);
}


// ==============================
// RASTREO DE PAQUETE (PÚBLICO)
// ==============================
let mapaRastreo = null;
let marcadorRastreo = null;

const btnRastrear = document.getElementById("btn-rastrear");

if(btnRastrear){
  btnRastrear.addEventListener("click", async function(){
    const guia = document.getElementById("guia-buscar").value.trim().toUpperCase();
    const resultado = document.getElementById("resultado-rastreo");
    const contenedorMapa = document.getElementById("mapa-rastreo");

    if(!guia){
      resultado.innerHTML = "Por favor ingresa un número de guía.";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/paquetes/${guia}`);

      if(!res.ok){
        resultado.innerHTML = "❌ No se encontró ningún paquete con ese número de guía.";
        contenedorMapa.style.display = "none";
        return;
      }

      const paquete = await res.json();

      let estadoColor = "#084b83";
      if(paquete.estado === "En ruta") estadoColor = "#7c5c00";
      if(paquete.estado === "Entregado") estadoColor = "#1b6b35";
      if(paquete.estado === "Incidencia") estadoColor = "#c0392b";

      resultado.innerHTML = `
        <strong>📦 Número de guía:</strong> ${paquete.numeroGuia}<br>
        <strong>👤 Remitente:</strong> ${paquete.remitente}<br>
        <strong>📍 Destinatario:</strong> ${paquete.destinatario}<br>
        <strong>🏠 Dirección:</strong> ${paquete.direccionDestino}<br>
        <strong>🚴 Repartidor:</strong> ${paquete.repartidor}<br>
        <strong>📊 Estado:</strong> <span style="color:${estadoColor}; font-weight:bold;">${paquete.estado}</span>
      `;

      // Mostrar mapa con ubicación del repartidor
      contenedorMapa.style.display = "block";

      const resUbicaciones = await fetch(`${API_URL}/api/repartidores/ubicaciones`);
      const ubicaciones = await resUbicaciones.json();

      const ubicacionRepartidor = ubicaciones.find(r => r.nombre === paquete.repartidor);
      const lat = ubicacionRepartidor ? ubicacionRepartidor.lat : 4.6097;
      const lng = ubicacionRepartidor ? ubicacionRepartidor.lng : -74.0817;

      if(!mapaRastreo){
        mapaRastreo = L.map("mapa-rastreo").setView([lat, lng], 14);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap"
        }).addTo(mapaRastreo);
      } else {
        mapaRastreo.setView([lat, lng], 14);
      }

      if(marcadorRastreo){
        marcadorRastreo.setLatLng([lat, lng]);
      } else {
        marcadorRastreo = L.marker([lat, lng])
          .addTo(mapaRastreo)
          .bindPopup(`🛵 ${paquete.repartidor}<br>Estado: ${paquete.estado}`)
          .openPopup();
      }

    } catch(error) {
      resultado.innerHTML = "Error al consultar el paquete.";
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

  canvas.addEventListener("mousedown", function(){ dibujando = true; });
  canvas.addEventListener("mouseup", function(){ dibujando = false; ctx.beginPath(); });

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
  if(notasGuardadas){ notas.innerText = notasGuardadas; }
}

if(btnNotas){
  btnNotas.addEventListener("click", function(){
    localStorage.setItem("mensajeCampaña", notas.innerText);
    alert("Mensaje guardado correctamente.");
  });
}