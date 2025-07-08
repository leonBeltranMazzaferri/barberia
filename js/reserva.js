// Simulación de turnos ocupados (en producción, esto vendría de un backend)
const turnosOcupados = {
  // formato: 'YYYY-MM-DD': [hora, hora, ...]
  '2025-07-10': ['10:00', '11:00'],
  '2025-07-12': ['15:00'],
};

const servicios = [
  { nombre: "Corte", precio: 4000 },
  { nombre: "Teñir", precio: 6000 },
  { nombre: "Barba", precio: 2500 }
];

const hoy = new Date();
const year = hoy.getFullYear();
const month = hoy.getMonth(); // 0-indexed

function pad(n) { return n < 10 ? '0'+n : n; }

function getDiasMes(year, month) {
  const dias = [];
  const ultimo = new Date(year, month+1, 0).getDate();
  for(let d=1; d<=ultimo; d++) {
    const fecha = `${year}-${pad(month+1)}-${pad(d)}`;
    // Si todas las horas están ocupadas, no mostrar el día
    if(turnosOcupados[fecha]?.length >= 13) continue;
    dias.push({ dia: d, fecha });
  }
  return dias;
}

function getHorasDisponibles(fecha) {
  const ocupados = turnosOcupados[fecha] || [];
  const horas = [];
  for(let h=10; h<=21; h++) {
    const hora = pad(h)+":00";
    if(!ocupados.includes(hora)) horas.push(hora);
  }
  return horas;
}

let diaSeleccionado = null;
let horaSeleccionada = null;
let servicioSeleccionado = null;

function renderDias() {
  const dias = getDiasMes(year, month);
  const cont = document.getElementById('dias-lista');
  cont.innerHTML = '';
  dias.forEach(d => {
    const box = document.createElement('div');
    box.className = 'dia-box';
    box.textContent = `Día ${d.dia}`;
    box.onclick = () => {
      diaSeleccionado = d.fecha;
      horaSeleccionada = null;
      servicioSeleccionado = null;
      renderHoras();
      renderServicios();
      renderConfirmar();
    };
    cont.appendChild(box);
  });
}

function renderHoras() {
  const cont = document.getElementById('horas-lista');
  cont.innerHTML = '';
  if(!diaSeleccionado) return;
  const horas = getHorasDisponibles(diaSeleccionado);
  horas.forEach(h => {
    const box = document.createElement('div');
    box.className = 'hora-box';
    box.textContent = h;
    box.onclick = () => {
      horaSeleccionada = h;
      servicioSeleccionado = null;
      renderServicios();
      renderConfirmar();
    };
    cont.appendChild(box);
  });
}

function renderServicios() {
  const cont = document.getElementById('servicios-lista');
  cont.innerHTML = '';
  if(!horaSeleccionada) return;
  servicios.forEach(s => {
    const box = document.createElement('div');
    box.className = 'servicio-box';
    box.textContent = `${s.nombre} ($${s.precio})`;
    box.onclick = () => {
      servicioSeleccionado = s;
      renderConfirmar();
    };
    cont.appendChild(box);
  });
}

function renderConfirmar() {
  const cont = document.getElementById('confirmar-turno');
  cont.innerHTML = '';
  if(diaSeleccionado && horaSeleccionada && servicioSeleccionado) {
    const resumen = document.createElement('div');
    resumen.innerHTML = `
      <p>Turno: <b>${diaSeleccionado}</b> a las <b>${horaSeleccionada}</b></p>
      <p>Servicio: <b>${servicioSeleccionado.nombre}</b> ($${servicioSeleccionado.precio})</p>
      <p>Total a pagar ahora (50%): <b>$${servicioSeleccionado.precio/2}</b></p>
      <button id="pagar-btn">Pagar con Mercado Pago</button>
    `;
    cont.appendChild(resumen);
    document.getElementById('pagar-btn').onclick = () => {
      alert('Redirigiendo a Mercado Pago...');
      // Aquí iría la integración real con Mercado Pago
    };
  }
}

renderDias();