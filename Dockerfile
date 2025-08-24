# Usar una imagen base de Node.js
FROM node:20

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production=false

# Copiar el código fuente
COPY . .

# Instalar dependencias para agregar el repositorio de PostgreSQL y luego el cliente
RUN apt-get update -y && apt-get install -y curl gnupg lsb-release \
    && curl -sS https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && apt-get update -y \
    && apt-get install -y postgresql-client-15

# Dar permisos de ejecución al script de inicialización
RUN chmod +x /usr/src/app/scripts/init.sh

# Exponer el puerto
EXPOSE 3000

# Establecer el script de inicialización como punto de entrada
ENTRYPOINT ["/usr/src/app/scripts/init.sh"]
