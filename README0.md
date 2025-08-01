# CV-Mabc

## Configuración del Entorno (WSL Ubuntu)

### Optimización de Rendimiento WSL
1. Asegúrate de que los archivos del proyecto estén en el sistema de archivos de Linux:
   - Mover el proyecto a `/home/[usuario]/` en lugar de `/mnt/c/`
   - El sistema de archivos de Windows (`/mnt/c/`) es significativamente más lento

2. Configuración en `.wslconfig`:
   - Crear/editar archivo en Windows: `%UserProfile%\.wslconfig`
   ```
   [wsl2]
   memory=8GB
   processors=4
   swap=2GB
   ```

3. Optimización de Docker:
   - Limitar los recursos de Docker
   - Limpiar recursos no utilizados: `docker system prune`

4. Actualizar WSL:
   ```bash
   wsl --update
   ```

#!/bin/bash

# ========================
# ACTUALIZACIÓN DEL SISTEMA
# ========================
sudo apt update && sudo apt upgrade -y

# ========================
# NODE.JS Y ANGULAR CLI
# ========================
# Elimina versiones antiguas
sudo apt remove nodejs npm -y

# Instala Node.js 20 LTS desde NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Actualiza npm a versión específica (opcional)
sudo npm install -g npm@11.5.1

# Instala Angular CLI globalmente
npm install -g @angular/cli

# Verifica Angular CLI
ng version

# ========================
# DOCKER Y DOCKER COMPOSE
# ========================
sudo apt install -y ca-certificates curl gnupg lsb-release

# Agrega clave GPG de Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Agrega repositorio de Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instala Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Permite usar Docker sin sudo
sudo usermod -aG docker $USER

# Verifica Docker
docker version
docker run hello-world

# ========================
# GIT Y UTILITARIOS
# ========================
sudo apt install -y git
sudo apt install -y curl wget
sudo apt install -y vim
sudo apt install -y make
sudo apt install -y jq
sudo apt install -y build-essential

# ========================
# POSTGRESQL CLIENT Y SERVER
# ========================
# Instala cliente
sudo apt install -y postgresql-client

# Instala servidor PostgreSQL (opcional)
sudo apt install postgresql postgresql-contrib -y
sudo service postgresql start

# Crear base de datos y cambiar contraseña
sudo -u postgres psql <<EOF
CREATE DATABASE mabc_cv_test;
ALTER USER postgres WITH PASSWORD '123456';
\q
EOF

# ========================
# DOCKER COMPOSE (APP)
# ========================
docker login
docker-compose up -d

### Pre-requisitos
- Docker instalado en WSL
- Node.js instalado
- WSL Ubuntu configurado

### Configuración de Docker y Base de Datos

1. Iniciar los contenedores Docker:
```bash
docker-compose up -d
```

2. Verificar que los contenedores estén corriendo:
```bash
docker-compose ps
```

### Puertos configurados
- Base de datos desarrollo: 5433
- Base de datos pruebas: 5434

### Comandos de la Aplicación

#### Iniciar la aplicación
- Modo desarrollo (con hot-reload):
```bash
npm run dev
```

- Modo producción:
```bash
npm start
```

#### Ejecutar Tests
- Tests unitarios:
```bash
npm run test:unit
```

- Tests de integración:
```bash
npm run test:integration
```

- Test específico:
```bash
npm run test:single
```

### Notas Importantes
- La estructura de la base de datos se crea automáticamente a través de `sequelize.sync()` en el archivo `test/globalSetup.js`
- No se utilizan migraciones manuales
- Los seeders se ejecutan automáticamente durante la configuración de las pruebas
