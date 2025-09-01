import db from '../../../src/models/index.js';
import { encriptarPassword } from '../../../src/shared/functions.js';
import * as constantes  from '../../../src/shared/constants.js';
import jwt from "jsonwebtoken";

const {
  UsuarioModel,
  RolModel,
  CategoriaModel,
  SubCategoriaModel,
  GeneroModel,
  MarcaModel,
  ProductoModel,
  ValoracionProductoModel,
  AtributosModel,
  AtributosProductoModel
} = db;

  
export const createUserAndLogin = async ()  => {
  const email = 'test@email.cl';
  const password = '123123';
  const rol_id = 1;
  
  try {
    let usuario = await buscarUsuario(email);
    if(!usuario){
      const rol = await crearRolDePrueba(rol_id)  
      usuario = crearUsuarioDePrueba(email, password, rol.id)
    }

    if(!usuario){
      throw new Error('No se pudo crear el usuario de prueba');
    } 
    return jwt.sign({ id: usuario.id }, constantes.secret, { expiresIn: "1h" });

  } catch (err) {
    console.error('Error al crear el usuario de prueba:', err);
    throw err;
  }
  
}


const buscarUsuario = async (email) => {
  const user = await UsuarioModel.findOne({where: { email }, paranoid: false });
  return user;
}


const crearUsuarioDePrueba = async (email, password, rol_id) => {
  const pwd = await encriptarPassword(password);
  const user = await UsuarioModel.findOrCreate({
      where: { email }, // Buscar por email
      paranoid: false,
      defaults: {
        rut: '77777777-7',
        nombres: 'Test',
        apellido1: 'User',
        apellido2: 'Test',
        avatar: '',
        direccion: 'dirección test',
        fono: '3333333333',
        email,
        user_name: 'mabc',
        password: pwd, // Si tu login requiere hash, usa el hash aquí
        refresh_token: null,
        rol_id
      }
    });
    if(user.deleted_at != null){
      user.deleted_at = null;
      await user.save();
    }
    return user;
}


// Asegura que el rol exista antes de crear el usuario
const crearRolDePrueba = async (rol_id) => {
  const  rolDefaults = {
    1: { id: 1, nombre: 'Admin' },
    2: { id: 2, nombre: 'Cliente' }
  };
  const rolData = rolDefaults[rol_id] || { id: rol_id, nombre: `Rol Test ${rol_id}` };

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
    return rol;
  }
  return null;
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
      //console.log('producto.id',producto.id, 'atributo.id',atributo.id);
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