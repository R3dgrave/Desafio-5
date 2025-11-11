const tareas = [
  { id: 1, nombre: "hacer compras", estado: false },
  { id: 2, nombre: "Estudiar", estado: false },
  { id: 3, nombre: "Dormir", estado: false },
];
let contadorIDs = 4;

const valorInput = document.getElementById("nuevoValor");
const botonAgregar = document.getElementById("agregarValor");
const listaContenedor = document.getElementById("listaTareas");
const totalTareas = document.getElementById("totalTareas");
const tareasRealizadas = document.getElementById("tareasRealizadas");

botonAgregar.addEventListener("click", () => {
  const valor = { id: contadorIDs, nombre: valorInput.value, estado: false };
  if (!valor) {
    return;
  }
  tareas.push(valor);
  valorInput.value = "";
  renderizarTareas();
  calcularTotalTareas();
  contadorIDs++;
});

const borrar = (id) => {
  const index = tareas.findIndex((ele) => ele.id == id);
  tareas.splice(index, 1);
  renderizarTareas();
  calcularTotalTareas();
};

const calcularTotalTareas = () => {
  const total = tareas.length;
  totalTareas.innerText = total;
};

const toogleEstado = (id) => {
  const tareaEncontrada = tareas.find((tarea) => tarea.id === id);
  if (tareaEncontrada) {
    tareaEncontrada.estado = !tareaEncontrada.estado;
  }
  actualizarContadorRealizadas();
};

const actualizarContadorRealizadas = () => {
  let tareasTrue = tareas.filter((tarea) => tarea.estado).length;
  tareasRealizadas.innerText = tareasTrue;
};

const renderizarTareas = () => {
  let html = "";
  for (let tarea of tareas) {
    const checked = tarea.estado ? "checked" : "";
    html += `
    <tr id="fila-${tarea.id}">
      <td>${tarea.id}</td>
      <td id="nombre-${tarea.id}">
        <span class="tarea-texto">${tarea.nombre}</span>
      </td>
      <td class="tareaTd">
        <input type="checkbox" ${checked} onchange="toogleEstado(${tarea.id})" name="estado"/>
        <button id="botonBorrar" onclick="borrar(${tarea.id})">x</button>
      </td>
    </tr>
    `;
  }
  listaContenedor.innerHTML = html;
  calcularTotalTareas();
  actualizarContadorRealizadas();
};

renderizarTareas();
