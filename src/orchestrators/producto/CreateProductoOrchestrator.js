import { sequelize } from '../../../config/database.js';
import createProductoService from '../../services/producto/CreateProductoService.js';
import createAtributoProductoService from '../../services/atributoProducto/CreateAtributoProductoService.js';
import createColorProductoService from '../../services/colorProducto/CreateColorProductoService.js';
import createMaterialProductoService from '../../services/materialProducto/CreateMaterialProductoService.js';
import createTallaLetraProductoService from '../../services/tallaLetraProducto/CreateTallaLetraProductoService.js';
import createTallaNumeroProductoService from '../../services/tallaNumeroProducto/CreateTallaNumeroProductoService.js';
import createPesoProductoService from '../../services/pesoProducto/CreatePesoProductoService.js';
import createAtributoService from '../../services/atributo/CreateAtributoService.js';
import createDimensionesProductoService from '../../services/dimensionesProducto/CreateDimensionesProductoService.js';

const createProductoOrchestrator = async (data) => {
  const {
    sku,
    nombre,
    descripcion,
    sub_categoria_id,
    genero_id,
    marca_id,
    precio,
    
    atributos,  //otros
    color_id,
    dimensiones,
    material_id,
    talla_letra_id,
    talla_numerica_id,
    peso,
  } = data;

  const INFO = "No aplica;"

  const producto = {sku, nombre, descripcion, sub_categoria_id, genero_id, marca_id, precio};

  const transaction = await sequelize.transaction(); // Inicia la transacción
  try{
    // Grabando el registro principal del producto
    const record1 = await createProductoService(producto, transaction);
    
    if(!record1 || !record1.id){
      throw new Error("Error al intentar registrar el producto.")
    };

    const producto_id = record1.id;
    
    // grabando atributos y otros objetos asociados al producto
    const record2 = atributos ? await grabarAtributos(atributos, transaction) : [];
    const record3 = await grabarAtributosProducto(producto_id, record2, transaction);
    const record4 = color_id ? await createColorProductoService({producto_id, color_id}, transaction) : INFO;
    if(dimensiones) dimensiones.producto_id = producto_id;
    const record5 = dimensiones ? await createDimensionesProductoService(dimensiones,transaction): INFO;
    const record6 = material_id?.length > 0 ? await grabarMateriales(producto_id, material_id, transaction) : INFO;
    const record7 = talla_letra_id?.length > 0 ? await grabarTallasLetras(producto_id, talla_letra_id, transaction) : INFO;
    const record8 = talla_numerica_id?.length > 0 ? await grabarTallasNumericas(producto_id, talla_numerica_id, transaction) : INFO;
    if(peso)peso.producto_id = producto_id;
    const record9 = peso ? await createPesoProductoService(peso, transaction) : INFO;
    
    // Confirma la transacción si todo salió bien
    await transaction.commit();

    return {
        producto: record1, 
        atributos: record2, 
        atributosProducto: record3, 
        color: record4, 
        dimensiones: record5, 
        material: record6, 
        talla_letra: record7, 
        talla_numero: record8, 
        peso: record9
      };
  }catch(error){
    // Si ocurre un error, deshace todas las operaciones
    await transaction.rollback();
    throw error;
  }
};

const grabarAtributos = async (atributos, transaction) => {
  return await Promise.all(atributos.map(async data => {
    return await createAtributoService(data, transaction);
  }));
}

const grabarAtributosProducto = async (producto_id, atributos, transaction) => {
  return await Promise.all(atributos.map(async elem => {
    return await createAtributoProductoService({producto_id, atributo_id: elem.id}, transaction);
  }));
}

const grabarMateriales = async (producto_id, materiales, transaction) => {
  const results = await Promise.all(materiales.map(async elem => {
    return await createMaterialProductoService({producto_id, material_id: elem}, transaction);
  }));
  return results;
}

const grabarTallasLetras = async (producto_id, tallas, transaction) => {
  const results = await Promise.all(tallas.map(async elem => {
    return await createTallaLetraProductoService({producto_id, talla_letra_id: elem}, transaction);
  }));
  return results;
}

const grabarTallasNumericas = async (producto_id, tallas, transaction) => {
  const results = await Promise.all(tallas.map(async elem => {
    return await createTallaNumeroProductoService({producto_id, talla_numerica_id: elem}, transaction);
  }));
  return results;
}

export default createProductoOrchestrator;



