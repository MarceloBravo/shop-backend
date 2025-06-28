import request from 'supertest';
import { app } from '../../src/index.js';
import { sequelize } from '../../config/database.js';
import { TestAuthHelper } from './helpers/TestAuthHelper.js';



describe('User API Integration Tests', () => {
  let token;
  beforeAll(async () => {
    // Aseguramos que la base de datos esté sincronizada
    await sequelize.sync({ force: true });
    token = await TestAuthHelper.createUserAndLogin();
  });

  afterAll(async () => {
    // Cerramos la conexión a la base de datos
    await sequelize.close();
  });

  beforeEach(async () => {
    // Limpiamos las tablas antes de cada test
    await sequelize.truncate({ cascade: true });
  });

  describe('POST /api/v1/usuario', () => {
    test('debería crear un nuevo usuario', async () => {
      const userData = {
        name: 'Ana García',
        email: 'ana@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/v1/usuario')
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');
    });

    test('debería retornar error 400 con datos inválidos', async () => {
      const invalidUserData = {
        name: 'Ana García'
        // Email faltante
      };

      const response = await request(app)
        .post('/api/v1/usuario')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidUserData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/v1/usuario/:id', () => {
    test('debería obtener un usuario existente', async () => {
      // Primero creamos un usuario
      const userData = {
        name: 'Carlos Ruiz',
        email: 'carlos@example.com',
        password: 'password123'
      };

      const createResponse = await request(app)
        .post('/api/v1/usuario')
        .set('Authorization', `Bearer ${token}`)
        .send(userData);

      const userId = createResponse.body.id;

      // Luego intentamos obtenerlo
      const response = await request(app)
        .get(`/api/v1/usuario/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.id).toBe(userId);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password');
    });

    test('debería retornar 404 para un usuario que no existe', async () => {
      const nonExistentId = 99999;

      await request(app)
        .get(`/api/v1/usuario/${nonExistentId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PUT /api/v1/usuario/:id', () => {
    test('debería actualizar un usuario existente', async () => {
      // Crear usuario
      const userData = {
        name: 'Luis Torres',
        email: 'luis@example.com',
        password: 'password123'
      };

      const createResponse = await request(app)
        .post('/api/v1/usuario')
        .set('Authorization', `Bearer ${token}`)
        .send(userData);

      const userId = createResponse.body.id;

      // Actualizar usuario
      const updateData = {
        name: 'Luis Torres Actualizado'
      };

      const response = await request(app)
        .put(`/api/v1/usuario/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe(updateData.name);
      expect(response.body.email).toBe(userData.email);
    });
  });
});