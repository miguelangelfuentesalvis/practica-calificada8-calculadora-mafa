// CONSTANTES
const productos = [
  { nombre: "Laptop", precio: 1200 },
  { nombre: "Mouse", precio: 25 },
  { nombre: "Teclado", precio: 50 },
  { nombre: "Monitor", precio: 300 },
  { nombre: "Silla Gamer", precio: 450 },
  { nombre: "Audífonos", precio: 80 },
  { nombre: "Webcam", precio: 60 },
  { nombre: "USB 128GB", precio: 30 },
  { nombre: "Impresora", precio: 200 },
  { nombre: "Tablet", precio: 500 },
];

const resultados = document.querySelector("#resultados");
const listaProductos = document.querySelector("#listaProductos");

const btnVerificar = document.querySelector("#btnVerificar");
const btnMostrar = document.querySelector("#btnMostrar");
const btnDescuento = document.querySelector("#btnDescuento");
const btnFiltrar = document.querySelector("#btnFiltrar");
const btnPrimeros = document.querySelector("#btnPrimeros");
const btnOrdenar = document.querySelector("#btnOrdenar");
const btnInvertir = document.querySelector("#btnInvertir");

// FUNCIONES

// Mostrar resultados en el HTML
function mostrarEnHTML(titulo, productosArray) {
  resultados.innerHTML = ""; // Limpiar resultados anteriores

  const html = `
      <div class="p-4 bg-gray-100 rounded-md border">
          <h3 class="text-lg font-semibold mb-4">${titulo}</h3>
          <ul class="space-y-2">
              ${productosArray
                  .map(
                      (p) => `
                  <li class="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-md">
                      <span class="text-gray-700">${p.nombre}</span>
                      <span class="font-semibold">$${p.precio.toFixed(2)}</span>
                  </li>
              `
                  )
                  .join("")}
          </ul>
      </div>
  `;

  resultados.innerHTML = html;
}

// Mostrar todos los productos
function mostrarProductos() {
  productos.forEach((p) => {
      console.log(`Nombre: ${p.nombre}, Precio: $${p.precio}`);
  });
  mostrarEnHTML("Productos Disponibles", productos);
}

// Verificar disponibilidad de un producto
function verificarDisponibilidad() {
  const productoBuscado = listaProductos.value;

  if (!productoBuscado) {
      alert("Por favor, selecciona un producto.");
      return;
  }

  const productosDisponibles = productos.map((p) => p.nombre);
  const disponible = productosDisponibles.includes(productoBuscado);

  resultados.innerHTML = `
      <div class="p-4 bg-gray-100 rounded-md border">
          <h3 class="font-semibold">¿"${productoBuscado}" está disponible?</h3>
          <p>${disponible ? "Sí" : "No"}</p>
      </div>
  `;
}

// Aplicar descuento del 10% a los productos
function aplicarDescuento() {
  const productosConDescuento = productos.map((p) => ({
      nombre: p.nombre,
      precio: p.precio * 0.9,
  }));
  mostrarEnHTML("Productos con 10% de descuento", productosConDescuento);
}

// Filtrar productos menores a $100
function filtrarBaratos() {
  const productosBaratos = productos.filter((p) => p.precio < 100);
  mostrarEnHTML("Productos menores a $100", productosBaratos);
}

// Mostrar los primeros 2 productos
function mostrarPrimeros() {
  const primerosProductos = productos.slice(0, 2);
  mostrarEnHTML("Primeros 2 productos", primerosProductos);
}

// Ordenar productos por precio (menor a mayor)
function ordenarPorPrecio() {
  const productosOrdenados = [...productos].sort((a, b) => a.precio - b.precio);
  mostrarEnHTML("Productos ordenados por precio", productosOrdenados);
}

// Invertir el orden de los productos
function invertirOrden() {
  const productosInvertidos = [...productos].reverse();
  mostrarEnHTML("Productos en orden inverso", productosInvertidos);
}

// Cargar la lista de productos en el <select>
function cargarListaProductos() {
  listaProductos.innerHTML = "";

  const opcionPorDefecto = document.createElement("option");
  opcionPorDefecto.value = "";
  opcionPorDefecto.textContent = "Selecciona un producto";
  opcionPorDefecto.disabled = true;
  opcionPorDefecto.selected = true;
  listaProductos.appendChild(opcionPorDefecto);

  productos.forEach((p) => {
      const opcion = document.createElement("option");
      opcion.value = p.nombre;
      opcion.textContent = p.nombre;
      listaProductos.appendChild(opcion);
  });
}

// Asignar eventos a los botones
function asignarEventos() {
  btnVerificar.addEventListener("click", verificarDisponibilidad);
  btnMostrar.addEventListener("click", mostrarProductos);
  btnDescuento.addEventListener("click", aplicarDescuento);
  btnFiltrar.addEventListener("click", filtrarBaratos);
  btnPrimeros.addEventListener("click", mostrarPrimeros);
  btnOrdenar.addEventListener("click", ordenarPorPrecio);
  btnInvertir.addEventListener("click", invertirOrden);
}

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  cargarListaProductos();
  asignarEventos();
});
