#!/bin/sh

# Esperar a que PostgreSQL esté listo
echo "Esperando que la base de datos esté disponible..."
until pg_isready -h postgres_dev -p 5432 -U postgres; do
  sleep 2
done

# Ejecutar sincronización y seeders
echo "Iniciando sincronización de base de datos y seeders..."
node scripts/run-migrate-seeders.js

# Iniciar la aplicación
echo "Iniciando la aplicación..."
npm run dev
