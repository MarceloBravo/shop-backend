import request from 'supertest';
import app from '../../../src/server.js'; // This import might still be an issue, but let's focus on the data seeding first

import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js'; // Import CategoriaModel
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';
import { ProductoModel } from '../../../src/models/ProductoModel.js';
import { encriptarPassword } from '../../../src/shared/functions.js'
import { ValoracionProductoModel } from '../../../src/models/ValoracionProductoModel.js';
import { AtributosModel } from '../../../src/models/AtributosModel.js';
import { AtributosProductoModel } from '../../../src/models/AtributosProductoModel.js';

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
    rut = '77777777-7',
    nombres = 'Test',
    apellido1 = 'User',
    apellido2 = 'Test',
    user_name = 'mabc',
    direccion = 'dirección test',
    fono = '3333333333',
    rol_id = 1
  } = {}) {

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
    }

    // Ensure a default Categoria exists for subcategory tests
    const defaultCategoriaId = 1;
    const categoria = await CategoriaModel.findByPk(defaultCategoriaId, { paranoid: false });
    if (!categoria) {
      await CategoriaModel.create({
        id: defaultCategoriaId,
        nombre: 'Default Category',
        descripcion: 'Default description for category', 
        deleted_at: null
      });
    } else if (categoria.deleted_at !== null) {
      categoria.deleted_at = null;
      await categoria.save();
    }

    try {
      const user = await UsuarioModel.findOrCreate({
        where: { rut }, // Buscar por RUT en lugar de email
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



export const createProductoTestData = async (cantidad = 1) => {
  await destroyProductoTestData();

  const categoria = await CategoriaModel.create({
      nombre: 'Categoria Test',
      descripcion: 'Descripcion de la categoria test' 
  });
  const subCategoria = await SubCategoriaModel.create({
      nombre: 'SubCategoria Test',
      categoria_id: categoria.id
  });
  const genero = await GeneroModel.create({
      genero: 'Masculino'
  });
  const marca = await MarcaModel.create({
      nombre: 'Marca Test',
      logo: 'http://example.com/logo.jpg'
  });

  const atributo = await AtributosModel.create({
      nombre: 'Atributo Test',
      valor_string: 'Valor String Test',
      valor_numerico: 123.45
  });

  const productos = [];
  while (cantidad--) {
    let producto = await ProductoModel.create({
        sku: 'SKU123'+ cantidad,
        nombre: 'Producto Test ' + cantidad,
        descripcion: 'Descripcion del producto test ' + cantidad,
        sub_categoria_id: subCategoria.id,
        genero_id: genero.id,
        marca_id: marca.id,
        precio: 100.00 * cantidad
      }).catch(err => {
        console.error('Error creating ProductoModel:', err) ;
      });

      await AtributosProductoModel.create({
          producto_id: producto.id,
          atributo_id: atributo.id
      });

      productos.push(producto);
  }
  return productos.length === 1 ? productos[0] : productos;
}

export const destroyProductoTestData = async () => {
  await ValoracionProductoModel.destroy({ where: {}, force: true });
  await AtributosProductoModel.destroy({ where: {}, force: true });
  await AtributosModel.destroy({ where: {}, force: true });
  await ProductoModel.destroy({ where: {}, force: true });
  await SubCategoriaModel.destroy({ where: {}, force: true });
  await CategoriaModel.destroy({ where: {}, force: true });
  await MarcaModel.destroy({ where: {}, force: true });
  await GeneroModel.destroy({ where: {}, force: true });
}


export const createValoracionProductoTestData = async (productoId, cantidad = 1, isDeleted = false) => {
    const valoraciones = [];
    while (cantidad--) {
        let valoracion = await ValoracionProductoModel.create({
            producto_id: productoId,
            estrellas: Math.floor(Math.random() * 5) + 1, // De 5 a 1 estrellas
            comentario: 'Comentario de prueba ' + cantidad,
            email: `test${cantidad}@test.com`,
            nombre: 'Usuario de prueba ' + cantidad,
            foto: `http://example.com/foto${cantidad}.jpg`,
            deleted_at: isDeleted ? new Date() : null // Si isDeleted es true, asigna una fecha de eliminación
        });
        valoraciones.push(valoracion);
    }
    return valoraciones.length === 1 ? valoraciones[0] : valoraciones;
}


export const createRelatedTestDataProducto = async (borrarDatos = true) => {
  if(borrarDatos) await destroyRelatedTestDataProducto();
  const sufijo = Math.random().toString(36).substring(2, 5);

  const categoria = await CategoriaModel.create({
      nombre: 'Categoria Test' + sufijo,
      descripcion: 'Descripcion de la categoria test' + sufijo
  });
  const subCategoria = await SubCategoriaModel.create({
      nombre: 'SubCategoria Test' + sufijo,
      categoria_id: categoria.id
  });
  const genero = await GeneroModel.create({
      genero: 'Masculino'
  });
  const marca = await MarcaModel.create({
      nombre: 'Marca Test' + sufijo,
      logo: `http://example.com/logo-${sufijo}.jpg`
  });

  return {
      categoria,
      subCategoria,
      genero,
      marca
  };
}


export const destroyRelatedTestDataProducto = async () => {
    await SubCategoriaModel.destroy({ where: {}, force: true });
    await CategoriaModel.destroy({ where: {}, force: true });
    await MarcaModel.destroy({ where: {}, force: true });
    await GeneroModel.destroy({ where: {}, force: true });
}   