# Tienda Online - Backend

Backend para una aplicación de tienda online básica, dockerizada y con un flujo de trabajo de Integración Continua usando GitHub Actions.

<!-- Aquí puedes agregar badges de estado del build, cobertura, etc. -->
<!--
[![Build Status](https://github.com/tu_usuario/shop-backend/actions/workflows/backend.yml/badge.svg)](https://github.com/tu_usuario/shop-backend/actions/workflows/backend.yml)
-->

## ✨ Características Principales

*   **API RESTful:** Endpoints para gestionar productos, categorías, etc.
*   **Autenticación con JWT:** Para ciertos endpoints se requiere estar autenticado ya que las peticiones se ,manejas con tokens y refresh tokens (ver el punto **listado de rutas** para conocer los endpoints de acceso restringido y ver aquellos en los cuales se implementa el midleware checkTocken), 
*   **ORM con Sequelize:** Mapeo de objetos relacional para una interacción sencilla con la base de datos.
*   **Base de datos de producción alojada en hosting Neon:** Base de datos relacional postgres.
*   **Dockerizado:** Entorno de desarrollo y pruebas consistente y fácil de levantar con Docker Compose. **Ahora con optimizaciones para producción (multi-stage build) y soporte para ejecutar tests dentro de contenedores.**
*   **Testing:** Cobertura de pruebas con Jest y Supertest.
*   **Integración Continua:** Workflow de GitHub Actions para ejecutar tests unitarios y de integración automáticamente.
*   **Despliegue contínuo:** Workflow de GitHub Actions para para desplegar la aplicación en un servidor de Railway.
*   **Implementación de principios SOLID y Clean Code**

## 🛠️ Tecnologías Utilizadas

*   **Node.js:** Entorno de ejecución de JavaScript.
*   **Express:** Framework para la creación de la API.
*   **PostgreSQL:** Base de datos relacional.
*   **Sequelize:** ORM para Node.js.
*   **Docker & Docker Compose:** Para la contenerización de la aplicación y la base de datos.
*   **Jest & Supertest:** Para tests unitarios y de integración.
*   **Dotenv:** Para la gestión de variables de entorno.

## 🚀 Puesta en Marcha

Sigue estos pasos para levantar el entorno de desarrollo local.

### Pre-requisitos

*   [Node.js](https://nodejs.org/) (versión LTS recomendada)
*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/)

### Pasos

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu_usuario/shop-backend.git
    cd shop-backend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto (`/shop-backend`) y complétalo con tus credenciales. Puedes usar el siguiente ejemplo como base:

    ```env
    # Develop
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_NAME=nombre_base_de_datos
    DB_PASS=password_base_de_datos
    APP_PORT=puerto_de_la_aplicacion
    DB_USER=usuario_base_de_datos
    DEFAULT_REG_POR_PAGINA=10  #Cantidad de regístros por defecto a mostrar por pagina al paginas los registros

    # Producción (Configuración para conectar a la base de datos de producción)
    DATABASE_URL=url_hosting_base_de
    NEON_DATABASE_URL=url_hosting_base_de

    # Test
    DB_HOST_TEST=localhost
    DB_PORT_TEST=5434
    DB_NAME_TEST=mabc_cv_test
    DB_PASS_TEST=password_base_de_datos_test
    APP_PORT_TEST=3000
    DB_USER_TEST=postgres  # Usuario base de datos test por defecto postgres
    ```

4.  **Levantar los servicios con Docker:**
    Este comando construirá y levantará los contenedores para la aplicación y las bases de datos de desarrollo y test.
    ```bash
    docker-compose up --build -d
    ```
    *   La base de datos de desarrollo estará disponible en el puerto `5433` (o el configurado en `.env`).
    *   La base de datos de pruebas estará disponible en el puerto `5434` (o el configurado en `.env`).

5.  **Sincronizar la base de datos y poblarla:**
    Este script sincronizará los modelos de Sequelize con la base de datos de desarrollo y ejecutará los seeders.
    ```bash
    npm run migrate:seed
    ```

### Ejecutar la Aplicación y Tests

Una vez que los servicios de Docker estén levantados:

*   **Para ejecutar la aplicación localmente (fuera de Docker):**
    Si deseas ejecutar la aplicación directamente en tu máquina (por ejemplo, para desarrollo con hot-reload), primero debes detener el contenedor de la aplicación que Docker Compose levantó, ya que ambos intentarán usar el puerto 3000.
    ```bash
    docker stop backend_cv
    npm run dev # Para desarrollo con hot-reload
    # o
    npm start # Para modo producción
    ```

*   **Para ejecutar los tests:**
    Asegúrate de que los contenedores de Docker estén corriendo (especialmente la base de datos de tests).
    ```bash
    npm run test
    ```
    Los tests se ejecutarán contra la base de datos de tests dockerizada.

## 📝 Documentación de la API
## 📜 Scripts Disponibles

Aquí están los comandos disponibles en `package.json` para facilitar el desarrollo y las pruebas:

*   `npm start`: Inicia la aplicación en modo de producción.
*   `npm run dev`: Inicia la aplicación en modo de desarrollo con hot-reload.
*   `npm test`: Ejecuta todos los tests (unitarios y de integración).
*   `npm run test:unit`: Ejecuta solo los tests unitarios.
*   `npm run test:integration`: Ejecuta solo los tests de integración.
*   `npm run test:single`: Ejecuta un solo test (requiere especificar el archivo de test).
*   `npm run route:list` / `npm run rutas`: Lista todas las rutas de la API.
*   `npm run test:watch`: Ejecuta los tests en modo "watch" (se vuelven a ejecutar al detectar cambios).
*   `npm run seed`: Ejecuta los seeders para poblar la base de datos.
*   `npm run migrate:seed`: Sincroniza la base de datos y ejecuta los seeders.
*   `npm run seed:test`: Ejecuta los seeders para la base de datos de tests.
*   `npm run test:unit:debug`: Ejecuta los tests unitarios en modo depuración.
*   `npm run test:coverage`: Ejecuta los tests (unitarios y de integración) y genera un reporte de cobertura de código.

## Listado de rutas
Ejemplo del comando `npm run rout:list` para listar rutas, en éste ejemplo sólo se listarán las rutas para el endpoint de productos:

 `npm run route:list -- --ruta=/product`

 Listado de rutas:
┌─────────┬───────────────────────────┬───────────────────────────────────────────────────────┬───────────────────────┐
│ (index) │ Métodos                   │ Ruta                                                  │ Middlewares           │
├─────────┼───────────────────────────┼───────────────────────────────────────────────────────┼───────────────────────┤
│ 0       │ 'GET'                     │ '/api/v1/producto/deleted'                            │ 'checkToken, execute' │
│ 1       │ 'GET'                     │ '/api/v1/producto/deleted/:id'                        │ 'checkToken, execute' │
│ 2       │ 'GET'                     │ '/api/v1/producto/deleted/page/:pag/:limit?/:filter?' │ 'checkToken, execute' │
│ 3       │ 'GET, POST'               │ '/api/v1/producto'                                    │ 'execute'             │
│ 4       │ 'GET, PUT, DELETE, PATCH' │ '/api/v1/producto/:id'                                │ 'execute'             │
│ 5       │ 'GET'                     │ '/api/v1/producto/page/:pag/:limit?/:filter?'         │ 'execute'             │
└─────────┴───────────────────────────┴───────────────────────────────────────────────────────┴───────────────────────┘

| Método | Ruta                | Descripción                  | 
| :----- | :------------------ | :--------------------------- | 
| `GET, POST` | `/api/v1/producto`  | Obtiene una lista de productos. |
| `POST     ` | `/api/v1/products`  | Crea un nuevo producto.      |
| `GET`  | `/api/v1/products/:id` | Obtiene un producto por su ID. |

Para un listado completo de los endpoints disponibles puedes correr el comando:

*   `npm run route:list`

el parámetro `--ruta=` acepta todo o parte de un texto a buscar de una URI

## 🌳 Estructura de Directorios Clave

Aquí se muestra una vista simplificada de la estructura de directorios clave del proyecto, omitiendo el contenido interno de los subdirectorios para mayor claridad:

```
src/
├── controllers/
│   ├── accionesPantalla/
│   ├── atributo/
│   ├── Categoria/
│   ├── color/
│   ├── genero/
│   ├── marca/
│   ├── materiales/
│   ├── menu/
│   ├── menuTienda/
│   ├── pantalla/
│   ├── producto/
│   ├── Rol/
│   ├── RolPermisos/
│   ├── subCategoria/
│   ├── tallaLetra/
│   ├── tallaNumero/
│   ├── tipoDimensiones/
│   ├── usuario/
│   └── ValoracionProducto/
├── enum/
├── interfaces/
├── models/
├── orchestrators/
│   └── producto/
├── repositories/
├── routes/
├── services/
│   ├── accionesPantalla/
│   ├── atributo/
│   ├── atributoProducto/
│   ├── Categoria/
│   ├── color/
│   ├── colorProducto/
│   ├── dimensionesProducto/
│   ├── genero/
│   ├── marca/
│   ├── materiales/
│   ├── materialProducto/
│   ├── menu/
│   ├── menuTienda/
│   ├── pantalla/
│   ├── pesoProducto/
│   ├── producto/
│   ├── Rol/
│   ├── RolPermisos/
│   ├── subCategoria/
│   ├── tallaLetra/
│   ├── tallaLetraProducto/
│   ├── tallaNumero/
│   ├── tallaNumeroProducto/
│   ├── tipoDimensiones/
│   ├── usuario/
│   └── ValoracionProducto/
└── shared/

test/
├── unit/
│   ├── controllers/
│   ├── orchestrators/
│   └── services/
└── integration/
    ├── accionesPantalla/
    ├── atributo/
    ├── categoria/
    ├── colores/
    ├── genero/
    ├── helpers/
    ├── marca/
    ├── materiales/
    ├── menu/
    ├── menuTienda/
    ├── pantalla/
    ├── producto/
    ├── roles/
    ├── roPermisos/
    ├── subCategoria/
    ├── tallaLetra/
    ├── tallaNumero/
    ├── tipoDimensiones/
    ├── usuarios/
    └── valoracionProducto/
```