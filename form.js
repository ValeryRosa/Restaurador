document.addEventListener("DOMContentLoaded", function (){

// 1. Cargar restauradores disponibles en el select "Nombre"
  const nombre = [
    "Ana María Rojas", "Carlos Ferrer", "Isabel Mendoza", "Tomás Ramírez",
    "Paula Duarte"
  ];

  const nombreSelect = document.querySelector('select[name="nombre"]');
  nombre.forEach(nombre => {
    const option = document.createElement("option");
    option.textContent = nombre;
    option.value = nombre;
    nombreSelect.appendChild(option);
  });

// 2. Cargar obras en el select "Estado"
  const obra = [
    "La Mona Lisa", "Venus de Milo", "El Pensador", "Balzac", 
    "La Victoria de Samotracia", "La persistencia de la memoria"
  ];

  const obraSelect = document.querySelector('select[name="obra"]');
  obra.forEach(obra => {
    const option = document.createElement("option");
    option.textContent = obra;
    option.value = obra;
    obraSelect.appendChild(option);
  });

// 2. Cargar estados de obra en el select "Estado"
  const estado = [
    "Disponible", "En restauración", "Por restaurar"
  ];

  const estadoSelect = document.querySelector('select[name="estado"]');
  estado.forEach(estado => {
    const option = document.createElement("option");
    option.textContent = estado;
    option.value = estado;
    estadoSelect.appendChild(option);
  });

// 3. Cargar tipos de restauración en el select "Tipo"
  const tipo = [
    "Eliminación de barnices oxidados", "Reintegración cromática", "Consolidación de capas pictóricas",
    "Tratamiento de xilófagos", "Aplicación de capas protectoras"
  ];

  const tipoSelect = document.querySelector('select[name="tipo"]');
  tipo.forEach(tipo => {
    const option = document.createElement("option");
    option.textContent = tipo;
    option.value = tipo;
    tipoSelect.appendChild(option);
  });

// 4. Botón "Actualizar" — limpia los campos del formulario
  document.getElementById("btnLimpiar").addEventListener("click", function () {
    document.querySelector("form").reset();
  })

// 5. Al enviar el formulario, guarda el registro en localStorage
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e){
    e.preventDefault(); // evita recargar la página

    // Obtener valores del formulario
    const nombre = form.nombre.value;
    const obra = form.obra.value;
    const tipo = form.tipo.value;
    const estado = form.estado.value;
    const fechaInicio = form.fecha_inicio.value;
    const fechaFin = form.fecha_fin.value;

    // Validar campos obligatorios
    if (!nombre || !obra || !tipo || !estado || !fechaInicio || !fechaFin) {
      alert("⚠️ Por favor, complete todos los campos antes de registrar.");
      return;
    }

    //Validar fechas
    if (new Date(fechaFin) < new Date(fechaInicio)) {
      alert("⚠️ La fecha de fin no puede ser anterior a la fecha de inicio.");
    return;
    }
    
    // Obtener y actualizar el contador de códigos
    let contador = parseInt(localStorage.getItem("contadorCodigos")) || 0;
      contador++;
      localStorage.setItem("contadorCodigos", contador);
    // Generar código tipo R001, R002, etc.
    const codigo = "R" + String(contador).padStart(4, '0');


    // Crear nuevo objeto de restauracion
    const registro = {
      id: Date.now(),
      codigo,
      nombre,
      obra,
      tipo,
      estado,
      fechaInicio,
      fechaFin,
    };

    // Guardar en localStorage
    let registros = JSON.parse(localStorage.getItem("restauraciones")) || [];
    registros.push(registro);
    localStorage.setItem("restauraciones", JSON.stringify(registros));

    // Confirmación y redirección
    alert("✅ Registro guardado correctamente.");
    window.location.href = "resumen.html";
  });
  
  let contadorPreview = parseInt(localStorage.getItem("contadorCodigos")) || 0;
  let codigoPreview = "R" + String(contadorPreview + 1).padStart(3, '0');
  document.getElementById("codigoGenerado").textContent = codigoPreview;
});
