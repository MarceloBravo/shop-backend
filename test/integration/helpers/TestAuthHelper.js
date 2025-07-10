import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import { RolModel } from '../../../src/models/RolModel.js';
import request from 'supertest';
import { app } from '../../../src/index.js';
import { encriptarPassword } from '../../../src/shared/functions.js'

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
    email = 'test@email.cl',
    password = '123123',
    rut = '111111111-1',
    nombres = 'Test',
    apellido1 = 'User',
    apellido2 = 'Test',
    user_name = 'mabc',
    direccion = 'dirección test',
    fono = '1111111111',
    rol_id = 1
  } = {}) {
    // Genera valores únicos y válidos para rut y user_name en cada test
    const uniqueSuffix = String(Date.now() + Math.floor(Math.random() * 1000));
    const rutBase = rut.split('-')[0];
    const rutSuffix = uniqueSuffix.slice(-4); // últimos 4 dígitos
    const rutFinal = rutBase + `${rutSuffix}-K`.slice(0, 13);
    // user_name: máx 20 caracteres 
    const userNameFinal = (user_name + uniqueSuffix).slice(0, 20);

    const  rolDefaults = {
      1: { id: 1, nombre: 'Admin' },
      2: { id: 2, nombre: 'Cliente' }
    };
    const rolData = rolDefaults[rol_id] || { id: rol_id, nombre: `Rol Test ${rol_id}` };
  
    // Asegura que el rol exista antes de crear el usuario
    if (rolData.id) {
      const rol = await RolModel.findByPk( rolData.id, { paranoid: false });
      if (!rol) {
        await RolModel.create({
          id: rolData.id,
          nombre: rolData.nombre,
          deleted_at: null
        });
      }else if(rol.deleted_at!= null){
          rol.deleted_at = null;
          await rol.save();
      }
    /*
      await RolModel.findOrCreate({
        where: {id: rolData.id },
        defaults: {nombre: rolData.nombre, deleted_at: null }
      });
      */
    }
    try {
      const user = await UsuarioModel.findOrCreate({
        where: { email },
        paranoid: false,
        defaults: {
          rut: rut,
          nombres,
          apellido1,
          apellido2,
          avatar: '',
          direccion: direccion || '',
          fono: fono || '',
          email,
          user_name: user_name,
          password: password ? await encriptarPassword(password) : password, // Si tu login requiere hash, usa el hash aquí
          refresh_token: null,
          rol_id
        }
      });
      if(user.deleted_at != null){
        user.deleted_at = null;
        await user.save();
      }
    } catch (err) {
      console.error('Error in UsuarioModel.findOrCreate:', err);
      throw err;
    }
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
