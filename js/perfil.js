// Simulación de turnos del usuario
let turnos = [
  { hora: "10:00 AM", servicio: "Corte", profesional: "Pablo" },
  { hora: "15:30 PM", servicio: "Barba", profesional: "Diego" }
];

function renderTurnos() {
  const cont = document.querySelector('.turnos');
  if (!cont) return;
  const lista = document.createElement('div');
  turnos.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'turno-item';
    item.innerHTML = `
      <span>${t.hora} - ${t.servicio} con ${t.profesional}</span>
      <button class="cancelar-btn" data-index="${i}">Cancelar</button>
    `;
    lista.appendChild(item);
  });
  cont.innerHTML = '<h3>Turnos del Día</h3>';
  cont.appendChild(lista);

  // Evento cancelar
  cont.querySelectorAll('.cancelar-btn').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(this.getAttribute('data-index'));
      if (confirm('¿Seguro que quieres cancelar este turno?')) {
        turnos.splice(idx, 1);
        renderTurnos();
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', renderTurnos);