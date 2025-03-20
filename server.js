const express = require("express");
const app = express();

app.use(express.json()); // Para procesar JSON

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("¡Hola, mundo desde Node.js!");
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
