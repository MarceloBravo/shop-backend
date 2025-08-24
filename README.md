# Tienda Online - Backend

Backend para una aplicación de tienda online básica, dockerizada y con un flujo de trabajo de Integración Continua usando GitHub Actions.

<!-- Aquí puedes agregar badges de estado del build, cobertura, etc. -->
<!--
[![Build Status](https://github.com/tu_usuario/shop-backend/actions/workflows/backend.yml/badge.svg)](https://github.com/tu_usuario/shop-backend/actions/workflows/backend.yml)
-->

## ✨ Características Principales

*   **API RESTful:** Endpoints para gestionar productos, categorías, etc.
*   **ORM con Sequelize:** Mapeo de objetos relacional para una interacción sencilla con la base de datos.
*   **Dockerizado:** Entorno de desarrollo y pruebas consistente y fácil de levantar con Docker Compose.
*   **Integración Continua:** Workflow de GitHub Actions para ejecutar tests unitarios y de integración automáticamente.
*   **Testing:** Cobertura de pruebas con Jest y Supertest.
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
    DB_HOST=localhost
    DB_PORT=5433
    DB_NAME=shop_dev_db
    DB_USER=postgres
    DB_PASS=tu_contraseña_dev
    APP_PORT=3000
    DEFAULT_REG_POR_PAGINA=10

    # Test
    DB_HOST_TEST=localhost
    DB_PORT_TEST=5434
    POSTGRES_DB_TEST=shop_test_db
    DB_USER_TEST=postgres
    DB_PASS_TEST=tu_contraseña_test
    APP_PORT_TEST=3000
    ```

4.  **Levantar los servicios con Docker:**
    Este comando construirá y levantará los contenedores para la aplicación y las bases de datos de desarrollo y test.
    ```bash
    docker-compose up --build -d
    ```
    *   La base de datos de desarrollo estará disponible en el puerto `5433`.
    *   La base de datos de pruebas estará disponible en el puerto `5434`.

5.  **Sincronizar la base de datos y poblarla:**
    Este script sincronizará los modelos de Sequelize con la base de datos de desarrollo y ejecutará los seeders.
    ```bash
    npm run migrate:seed
    ```

## 📜 Scripts Disponibles

*   `npm run dev`: Inicia la aplicación en modo de desarrollo con hot-reload.
*   `npm start`: Inicia la aplicación en modo de producción.
*   `npm run test`: Ejecuta todos los tests (unitarios y de integración).
*   `npm run test:unit`: Ejecuta solo los tests unitarios.
*   `npm run test:integration`: Ejecuta solo los tests de integración.

## 📝 Documentación de la API (Ejemplo)

| Método | Ruta                | Descripción                  |
| :----- | :------------------ | :--------------------------- |
| `GET`  | `/api/v1/products`  | Obtiene una lista de productos. |
| `POST` | `/api/v1/products`  | Crea un nuevo producto.      |
| `GET`  | `/api/v1/products/:id` | Obtiene un producto por su ID. |

Para un listado completo de los endpoints disponibles puedes correr el comando:

* `npm run routes`

## 🧪 Pruebas

Para ejecutar el conjunto completo de pruebas, asegúrate de que los contenedores Docker estén corriendo y luego ejecuta:

```bash
npm test
```
