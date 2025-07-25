import request from 'supertest';
import { app } from '../../src/index.js';
import { TestAuthHelper } from './helpers/TestAuthHelper.js';
import { encriptarPassword } from '../../src/shared/functions.js'



describe('User API Integration Tests', () => {
  let token;
  beforeAll(async () => {
    // Aseguramos que la base de datos esté sincronizada
    token = await TestAuthHelper.createUserAndLogin();
  });


  describe('POST /api/v1/usuario', () => {
    test('debería crear un nuevo usuario', async () => {
      const userData = {
        "rut": "33.333.333-3",
        "nombres": "Carla",
        "apellido1": "Baesa",
        "apellido2": "Cofré",
        "avatar": null,
        "direccion": "1 Sur 6 Oriente, #456",
        "fono": "+56 123456789",
        "email": "carlab@peres.cl",
        "user_name": "carlaB",
        "password": await encriptarPassword("123123"),
        "refresh_token": "",
        "rol_id": 1
      };

      const response = await request(app)
        .post('/api/v1/usuario')
        .set('Authorization', `Bearer ${token}`)
        .send(userData)

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(userData.name);
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data).not.toHaveProperty('password');
    });
  });

  describe('POST /api/v1/usuario', () => {
    test('debería retornar error 400 con datos inválidos', async () => {
      const invalidUserData = {
        name: 'Ana García'
        // Email faltante
      };

      const response = await request(app)
        .post('/api/v1/usuario')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidUserData)
        .expect(400)

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/v1/usuario/:id', () => {
    test('debería obtener un usuario existente', async () => {
      // Primero creamos un usuario
      const user = await crearUsuario();
      const userId = user.id;
      
      // Luego intentamos obtenerlo
      const response = await request(app)
      .get(`/api/v1/usuario/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
      
      expect(response.body.data.id).toBe(userId);
      expect(response.body.data.nombres).toBe(user.nombres);
      expect(response.body.data.email).toBe(user.email);
      expect(response.body).not.toHaveProperty('password');

      await request(app)
        .delete(`/api/v1/usuario/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    });

    test('debería retornar 404 para un usuario que no existe', async () => {
      const nonExistentId = 99999;

      const resp = await request(app)
        .get(`/api/v1/usuario/${nonExistentId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

        expect(resp.body).toEqual({ code: 404, mensaje: 'El registro no existe.' });
    });
  });

  describe('PUT /api/v1/usuario/:id', () => {
    test('debería actualizar un usuario existente', async () => {
      // Primero creamos un usuario
      const user = await crearUsuario();
      const userId = user.id;
      
      // Actualizar usuario
      user.nombres = 'Luis Torres Actualizado'
      user.email = 'luistorres@update_test.cl'

      const response = await request(app)
        .put(`/api/v1/usuario/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(user)
        .expect(200);

      expect(response.body.data.nombres).toBe(user.nombres);
      expect(response.body.data.email).toBe(user.email);

      await eliminarUsuario(userId)
    });
  });

  const crearUsuario = async () => {
    const userData = {
        rut: '10.003.737-8',
        nombres: 'Carlos',
        apellido1: 'Ruiz',
        apellido2: 'Gómez',
        avatar: null,
        direccion: '1 Sur 6 Oriente, #456',
        fono: '+56 123456789',
        email: 'carlosr@example.com',
        password: 'password123',
        user_name: 'carlosR',
        rol_id: 1
      };

      const createResponse = await request(app)
        .post('/api/v1/usuario')
        .set('Authorization', `Bearer ${token}`)
        .send(userData);

        return createResponse.body.data;
    }

    const eliminarUsuario = async (userId) => {
      await request(app)
        .delete(`/api/v1/usuario/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    }
});