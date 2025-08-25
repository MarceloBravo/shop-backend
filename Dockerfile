# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
# Si tienes un paso de transpilación (ej. Babel, TypeScript), hazlo aquí
# RUN npm run build # Si aplica

# Etapa final (producción)
FROM node:20-alpine

WORKDIR /app

# Copia solo los archivos necesarios de la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/index.js .
COPY --from=builder /app/package.json .
COPY --from=builder /app/module-alias-register.js .
COPY --from=builder /app/loadEnv.js .
COPY --from=builder /app/babel.config.js .
COPY --from=builder /app/jsconfig.json .


# Configura el entorno de producción
ENV NODE_ENV=production
# O el puerto que uses en producción
ENV APP_PORT=3000

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]