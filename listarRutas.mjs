//import './loadEnv.js';
import fs from 'fs';
import path from 'path';

import app from './src/server.js'; // Ajusta el path a tu app
import listEndpoints from 'express-list-endpoints';

const rutas = listEndpoints(app);

// Filtrar por método
const metodo = process.argv.find(arg => arg.startsWith('--method='))?.split('=')[1];

// Filtrar por parte del nombre de la ruta
const filtroRuta = process.argv.find(arg => arg.startsWith('--ruta='))?.split('=')[1] || '';


// Filtrar las rutas según los parámetros proporcionados
const rutasFiltradas = rutas.filter(ruta => {
  const coincideConRuta = filtroRuta ? ruta.path.includes(filtroRuta) : true; // Filtrar por nombre de ruta (parcial)
  const coincideConMetodo = metodo ? ruta.methods.includes(metodo) : true; // Filtrar por método

  return coincideConRuta && coincideConMetodo;
});

// Función para retornar la ruta sin colorear
const mostrarRuta = (ruta) => {
  return ruta.path; // Retornar solo el nombre de la ruta sin color
};

// Mapear y formatear las rutas para salida
const rutasFormateadas = rutasFiltradas.map(ruta => ({
  Métodos: ruta.methods.join(', '),
  Ruta: mostrarRuta(ruta),
  Middlewares: ruta.middlewares.length ? ruta.middlewares.join(', ') : '-',
}));

// Mostrar en consola
console.log('Listado de rutas:');
console.table(rutasFormateadas);

// Exportar a CSV o JSON si se desea
const exportar = process.argv.includes('--export');

if (exportar) {
  const formato = process.argv.find(arg => arg.startsWith('--format='))?.split('=')[1] || 'json';
  const archivo = path.join(__dirname, `rutas_exportadas.${formato}`);

  if (formato === 'csv') {
    const csv = rutasFormateadas.map(ruta => `${ruta.Métodos},${ruta.Ruta},${ruta.Middlewares}`).join('\n');
    fs.writeFileSync(archivo, csv);
  } else {
    fs.writeFileSync(archivo, JSON.stringify(rutasFormateadas, null, 2));
  }

  console.log(`Rutas exportadas a: ${archivo}`);
}

process.exit(0);

/*
LISTAR RUTAS:
npm run route:list

FILTRAR POR RUTA
npm run route:list -- --ruta=/color

FILTRAR POR MÉTODO
npm run route:list -- --method=POST

EXPORTAR A CSV
npm run route:list -- --export --format=csv

EXPORTAR A JSON
npm run route:list -- --export --format=json
*/