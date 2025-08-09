// Esperar a que el documento esté cargado
document.addEventListener("DOMContentLoaded", function (){
  const tbody = document.getElementById("tabla-restauraciones");

  // Obtener los registros guardados en localStorage
  let registros = JSON.parse(localStorage.getItem("restauraciones")) || [];

  // 📄 Función para mostrar todos los registros en la tabla
  function mostrarRegistros() {
    tbody.innerHTML = "";

    registros.forEach((r, i) => {
      const fila = tbody.insertRow();

      fila.insertCell().textContent = i + 1;
      fila.insertCell().textContent = r.codigo;
      fila.insertCell().textContent = r.nombre;
      fila.insertCell().textContent = r.obra;
      fila.insertCell().textContent = r.tipo;
      fila.insertCell().textContent = r.estado;
      fila.insertCell().textContent = r.fechaInicio;
      fila.insertCell().textContent = r.fechaFin;

      const celdaAcciones = fila.insertCell();
      celdaAcciones.innerHTML = `
        <button class="btn btn-sm btn-warning me-1" onclick="editar(${r.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminar(${r.id})">Eliminar</button>
      `;
      //Pintar fila si el estado es "Por restaurar"
      if (r.estado.trim().toLowerCase() === "por restaurar") {
        fila.classList.add("fila-alerta");
      }  
    });
  }

  // ✏️ Función para editar un registro
  window.editar = function (id) {
    const registro = registros.find(r => r.id === id);
    if (!registro) return;

    document.getElementById("editId").value = registro.id;
    document.getElementById("editCodigo").value = registro.codigo;
    document.getElementById("editNombre").value = registro.nombre;
    document.getElementById("editObra").value = registro.obra;
    document.getElementById("editTipo").value = registro.tipo;
    document.getElementById("editEstado").value = registro.estado;
    document.getElementById("editInicio").value = registro.fechaInicio;
    document.getElementById("editFin").value = registro.fechaFin;

    new bootstrap.Modal(document.getElementById("editarModal")).show();
  };

  // 🗑️ Función para eliminar un registro
  window.eliminar = function (id) {
    registros = registros.filter(r => r.id !== id);
    localStorage.setItem("restauraciones", JSON.stringify(registros));
    mostrarRegistros();
  };

  // 💾 Guardar cambios del formulario de edición
  document.getElementById("formEditar").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = parseInt(document.getElementById("editId").value);
    const index = registros.findIndex(r => r.id === id);
    if (index === -1) return;

    registros[index] = {
      id,
      codigo: document.getElementById("editCodigo").value,
      nombre: document.getElementById("editNombre").value,
      obra: document.getElementById("editObra").value,
      tipo: document.getElementById("editTipo").value,
      estado: document.getElementById("editEstado").value,
      fechaInicio: document.getElementById("editInicio").value,
      fechaFin: document.getElementById("editFin").value
    };

    localStorage.setItem("restauraciones", JSON.stringify(registros));
    bootstrap.Modal.getInstance(document.getElementById("editarModal")).hide();
    mostrarRegistros();
  });

  // 🔍 Buscar por código exacto
  document.getElementById("btnBuscar").addEventListener("click", function () {
    const codigoBuscado = document.getElementById("buscarCodigo").value.trim().toLowerCase();

    if (codigoBuscado === "") {
      mostrarRegistros(); // Si está vacío, muestra todo
      return;
    }

    // Filtrar registros por coincidencia exacta del código
    const filtrados = registros.filter(r =>
      r.codigo && r.codigo.toLowerCase() === codigoBuscado
    );

    tbody.innerHTML = "";

    filtrados.forEach((r, i) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${i + 1}</td>
        <td>${r.codigo}</td>
        <td>${r.nombre}</td>
        <td>${r.obra}</td>
        <td>${r.tipo}</td>
        <td>${r.estado}</td>
        <td>${r.fechaInicio}</td>
        <td>${r.fechaFin}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editar(${r.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminar(${r.id})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  });
  // Mostrar los registros al cargar la página
  mostrarRegistros();
});