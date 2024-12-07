// Variables para el canvas, contexto, y herramientas
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
let currentTool = "brush"; // Herramienta seleccionada
let isDrawing = false;
let brushSize = 20;
let brushColor = "#000000";

// Función para iniciar el dibujo al hacer clic
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  draw(e); // Llamamos a la función de dibujo inmediatamente al hacer clic
});

// Función para detener el dibujo
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  ctx.closePath();
});

// Función para dibujar en el canvas según la herramienta seleccionada
canvas.addEventListener("mousemove", draw); // Se mantiene para el arrastre del mouse

// Función para cambiar la herramienta activa
document.querySelectorAll('input[name="tool"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    currentTool = e.target.value;
  });
});

// Función para cambiar el tamaño del pincel
const sizeRange = document.getElementById("sizeRange");
sizeRange.addEventListener("input", (e) => {
  brushSize = e.target.value;
  document.getElementById("sizeDisplay").textContent = brushSize;
});

// Función para cambiar el color
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", (e) => {
  brushColor = e.target.value;
});

// Función para dibujar según la herramienta seleccionada
function draw(e) {
  if (!isDrawing) return;

  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = brushColor;

  if (currentTool === "brush") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  if (currentTool === "eraser") {
    ctx.clearRect(
      e.offsetX - brushSize / 2,
      e.offsetY - brushSize / 2,
      brushSize,
      brushSize
    );
  }

  if (currentTool === "rectangle") {
    ctx.beginPath();
    ctx.rect(
      e.offsetX - brushSize / 2,
      e.offsetY - brushSize / 2,
      brushSize,
      brushSize
    );
    ctx.stroke();
  }

  if (currentTool === "circle") {
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, brushSize / 2, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (currentTool === "triangle") {
    const size = brushSize; // Usar el tamaño del pincel como el tamaño del triángulo
    const x = e.offsetX;
    const y = e.offsetY;

    ctx.beginPath();
    ctx.moveTo(x, y - size); // Punto superior del triángulo
    ctx.lineTo(x - size, y + size); // Punto inferior izquierdo
    ctx.lineTo(x + size, y + size); // Punto inferior derecho
    ctx.closePath();
    ctx.stroke();
  }

  if (currentTool === "text") {
    const textInput = document.getElementById("textInput").value;
    ctx.font = `${brushSize}px Arial`; // El tamaño del texto se ajusta según el tamaño del pincel
    ctx.fillText(textInput, e.offsetX, e.offsetY);
  }
}

// Función para limpiar el canvas (cuando el botón limpiar es presionado)
const clearCanvasButton = document.getElementById("clearCanvas");
clearCanvasButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Función para descargar el canvas
const downloadCanvasButton = document.getElementById("downloadCanvas");
downloadCanvasButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "drawing.png";
  link.click();
});
