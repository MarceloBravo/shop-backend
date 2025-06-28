import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import request from 'supertest';
import { app } from '../../../src/index.js';

export class TestAuthHelper {
  /**
   * Crea un usuario de prueba si no existe y retorna el token de autenticación.
   * @param {Object} options
   * @param {string} options.email
   * @param {string} options.password
   * @param {string} [options.rut]
   * @param {string} [options.nombres]
   * @param {string} [options.apellido1]
   * @param {string} [options.apellido2]
   * @param {string} [options.user_name]
   * @param {number} [options.rol_id]
   * @returns {Promise<string>} token JWT
   */
  static async createUserAndLogin({
    email = 'mabc@live.cl',
    password = '123123',
    rut = '12345678-9',
    nombres = 'Test',
    apellido1 = 'User',
    apellido2 = 'Test',
    user_name = 'mabc',
    rol_id = 1
  } = {}) {
    await UsuarioModel.findOrCreate({
      where: { email },
      defaults: {
        rut,
        nombres,
        apellido1,
        apellido2,
        avatar: null,
        direccion: null,
        fono: null,
        email,
        user_name,
        password, // Si tu login requiere hash, usa el hash aquí
        refresh_token: null,
        rol_id
      }
    });
    const loginResponse = await request(app)
      .post('/api/v1/login')
      .send({
        email,
        password,
        host: 'localhost'
      });
    if (!loginResponse.body.access_token) {
      throw new Error('No se pudo obtener el token de autenticación');
    }
    return loginResponse.body.access_token;
  }
}
