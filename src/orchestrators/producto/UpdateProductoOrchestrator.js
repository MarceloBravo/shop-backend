import { sequelize } from '../../../config/database.js';
import updateProductoService from '../../services/producto/UpdateProductoService.js';
import updateAtributoProductoService from '../../services/atributoProducto/UpdateAtributoProductoService.js';
import updateColorProductoService from '../../services/colorProducto/UpdateColorProductoService.js';
import updateDimensionesProductoService from '../../services/dimensionesProducto/UpdateDimensionesProductoService.js';
import updateMaterialProductoService from '../../services/materialProducto/UpdateMaterialProductoService.js';
import updateTallaLetraProductoService from '../../services/tallaLetraProducto/UpdateTallaLetraProductoService.js';
import updateTallaNumeroProductoService from '../../services/tallaNumeroProducto/UpdateTallaNumeroProductoService.js';
import updatePesoProductoService from '../../services/pesoProducto/UpdatePesoProductoService.js';
import updateAtributoService from '../../services/atributo/UpdateAtributoService.js';

import createAtributoProductoService from '../../services/atributoProducto/CreateAtributoProductoService.js';
import createAtributoService from '../../services/atributo/CreateAtributoService.js';
import createMaterialProductoService from '../../services/materialProducto/CreateMaterialProductoService.js';
import createTallaLetraProductoService from '../../services/tallaLetraProducto/CreateTallaLetraProductoService.js';
import createTallaNumeroProductoService from '../../services/tallaNumeroProducto/CreateTallaNumeroProductoService.js';

import deleteAtributoProductoService from '../../services/atributoProducto/DeleteAtributoProductoService.js';
import deleteColorProductoService from '../../services/colorProducto/DeleteColorProductoService.js';
import deleteDimensionesProductoService from '../../services/dimensionesProducto/DeleteDimensionesProductoService.js';
import deleteMaterialProductoService from '../../services/materialProducto/DeleteMaterialProductoService.js';
import deleteTallaLetraProductoService from '../../services/tallaLetraProducto/DeleteTallaLetraProductoService.js';
import deleteTallaNumeroProductoService from '../../services/tallaNumeroProducto/DeleteTallaNumeroProductoService.js';
import deletePesoProductoService from '../../services/pesoProducto/DeletePesoProductoService.js';

const INFO = 'No Aplica';


const updateProductoOrchestrator = async (producto_id, data) => {
  const transaction = await sequelize.transaction(); // Inicia la transacción
  try{

    const resultActualizacion = await actualizarDatos(producto_id, data, transaction);
    const resultEliminados = data.eliminados ?  await eliminarDatos(producto_id, data.eliminados, transaction) : INFO;
    
    // Confirma la transacción si todo salió bien
    await transaction.commit();

    return { 
        actualizados: resultActualizacion,
        eliminados: resultEliminados
      };
  }catch(error){
    // Si ocurre un error, deshace todas las operaciones
    await transaction.rollback();
    throw error;
  }
};


/* ******************** ACTUALIZAR DATOS *********************** */
const actualizarDatos = async (producto_id, data, transaction) => {
  const {
    sku,
    nombre,
    descripcion,
    sub_categoria_id,
    genero_id,
    marca_id,
    precio,
    
    atributos,  //otros
    color,
    dimensiones,
    material_id,
    talla_letra_id,
    talla_numerica_id,
    peso
  } = data;

  const dataProducto = {sku, nombre, descripcion, sub_categoria_id, genero_id, marca_id, precio};
  const producto = await updateProductoService(producto_id, dataProducto, transaction);
  peso.producto_id = producto_id;

  // grabando atributos y otros objetos asociados al producto
  const atributosActualizados = atributos ? await actualizarAtributos(atributos, transaction) : [];
  const atributos_result      = await actualizarAtributosProducto(producto_id, atributosActualizados, transaction);
  const color_result          = color ? await updateColorProductoService(color.id, {producto_id, color_id: color.color_id}, transaction) : INFO;
  const dimensiones_result    = dimensiones ? await updateDimensionesProductoService(dimensiones.id, {producto_id, dimensiones}, transaction) : INFO;
  const material              = material_id ? await grabarMateriales(producto_id, material_id, transaction) : INFO;
  const talla_letra           = talla_letra_id ? await grabarTallasLetras(producto_id, talla_letra_id, transaction) : INFO;
  const talla_numero          = talla_numerica_id ? await grabarTallasNumericas(producto_id, talla_numerica_id, transaction) : INFO;
  const peso_result           = peso ? await updatePesoProductoService(peso.id, peso, transaction) : INFO;

  return {
    producto, 
    atributos: atributos_result, 
    color: color_result.data.toJSON(), 
    dimensiones: dimensiones_result.data.toJSON(), 
    material, 
    talla_letra, 
    talla_numero, 
    peso: peso_result.data.toJSON()
  };
}



const actualizarAtributos = async (atributos, transaccion) => {
   const result = await Promise.all(atributos.map(async elem => {
     if(elem.atributo.id){
        elem.atributo = (await updateAtributoService(elem.atributo.id, elem.atributo, transaccion)).data.toJSON();
     }else{
        elem.atributo = (await createAtributoService(elem.atributo, transaccion)).toJSON();
     }
     return elem; 
   }));
   return result;
}

const actualizarAtributosProducto = async (producto_id, atributos, transaccion) => {
  return await Promise.all(atributos.map(async elem => {
    if(elem.id){
       return (await updateAtributoProductoService({id: elem.id, producto_id, atributo_id: elem.atributo.id}, transaccion)).data.toJSON();
     }else{
       return (await createAtributoProductoService({producto_id, atributo_id: elem.atributo.id}, transaccion)).toJSON();
     }
  }));
}

const grabarMateriales = async (producto_id, materiales, transaction) => {
  const results = await Promise.all(materiales.map(async elem => {
    if(elem.id){
      return await updateMaterialProductoService(elem.id, {producto_id, material_id: elem}, transaction);
    }else{
      return await createMaterialProductoService({producto_id, material_id: elem}, transaction);
    }
  }));
  return results;
}

const grabarTallasLetras = async (producto_id, tallas, transaction) => {
  const results = await Promise.all(tallas.map(async elem => {
    if(elem.id){
      return await updateTallaLetraProductoService(elem.id, {producto_id, talla_letra_id: elem}, transaction);
    }else{
      return await createTallaLetraProductoService({producto_id, talla_letra_id: elem}, transaction);
    }
  }));
  return results;
}

const grabarTallasNumericas = async (producto_id, tallas, transaction) => {
  const results = await Promise.all(tallas.map(async elem => {
    if(elem.id){
        return await updateTallaNumeroProductoService(elem.id, {producto_id, talla_numerica_id: elem}, transaction);
    }else{
      return await createTallaNumeroProductoService({producto_id, talla_numerica_id: elem}, transaction);
    }
  }));
  return results;
}


/* *************** ELIMINAR DATOS ***************** */

const eliminarDatos = async (producto_id, eliminados, transaction) => {
  const atributos = (eliminados.atributos) ?
     await Promise.all(eliminados.atributos.map(async (elem, key) => {
          return await deleteAtributoProductoService(elem, transaction)
      })) 
    : null;

  const color         = eliminados.color_id ? await deleteColorProductoService(id, {producto_id, color_id}, transaction) : null;
  const dimensiones   = eliminados.dimensiones ? await deleteDimensionesProductoService(dimensiones.id, {producto_id, dimensiones}, transaction) : null;
  const material      = eliminados.material_id ? await deleteMaterialProductoService(eliminados.material_id, transaction) : null;
  const talla_letra   = eliminados.talla_letra_id ? await deleteTallaLetraProductoService(eliminados.talla_letra_id, transaction) : null;
  const talla_numero  = eliminados.talla_numerica_id ? await deleteTallaNumeroProductoService(eliminados.talla_numerica_id, transaction) : null;
  const peso          = eliminados.peso?.id ? await deletePesoProductoService(eliminados.peso.id, transaction) : null;

  const result = { atributos, color, dimensiones, material, talla_letra, talla_numero, peso };

  return Object.fromEntries(
  Object.entries(result).filter(([_, valor]) => valor !== null)
);
  
}

export default updateProductoOrchestrator;