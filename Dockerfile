# Usar una imagen base de Node.js
FROM node:20

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# instala postgresql-client para usar pg_isready en el archivo scripts/init.sh
RUN apt-get update && apt-get install -y postgresql-client

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
