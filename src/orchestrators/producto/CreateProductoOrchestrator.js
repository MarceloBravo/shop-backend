import { sequelize } from '../../../config/database.js';
import CreateProductoService from '../../services/producto/CreateProductoService.js';
import CreateAtributoProductoService from '../../services/atributoProducto/CreateAtributoProductoService.js';
import CreateColorProductoService from '../../services/colorProducto/CreateColorProductoService.js';
import CreateMaterialProductoService from '../../services/materialProducto/CreateMaterialProductoService.js';
import CreateTallaLetraProductoService from '../../services/tallaLetraProducto/CreateTallaLetraProductoService.js';
import CreateTallaNumeroProductoService from '../../services/tallaNumeroProducto/CreateTallaNumeroProductoService.js';
import CreatePesoProductoService from '../../services/pesoProducto/CreatePesoProductoService.js';
import CreateAtributoService from '../../services/atributo/CreateAtributoService.js';
import CreateDimensionesProductoService from '../../services/dimensionesProducto/CreateDimensionesProductoService.js';

/**
 * @class CreateProductoOrchestrator
 * @description Orquestador para la creación de productos y sus relaciones
 */
class CreateProductoOrchestrator {

  /**
   * @constructor
   * @description Inicializa las instancias de servicios necesarias para la creación
   * @param {CreateProductoService} createProductoService - Servicio para crear productos
   * @param {CreateAtributoProductoService} createAtributoProductoService - Servicio para crear atributos de producto
   * @param {CreateColorProductoService} createColorProductoService - Servicio para crear colores de producto
   * @param {CreateMaterialProductoService} createMaterialProductoService - Servicio para crear materiales de producto
   * @param {CreateTallaLetraProductoService} createTallaLetraProductoService - Servicio para crear tallas letra de producto
   * @param {CreateTallaNumeroProductoService} createTallaNumeroProductoService - Servicio para crear tallas numéricas de producto
   * @param {CreatePesoProductoService} createPesoProductoService - Servicio para crear pesos de producto
   * @param {CreateAtributoService} createAtributoService - Servicio para crear atributos
   * @param {CreateDimensionesProductoService} createDimensionesProductoService - Servicio para crear dimensiones de producto
   */
  constructor(
    createProductoService = new CreateProductoService(),
    createAtributoProductoService = new CreateAtributoProductoService(),
    createColorProductoService = new CreateColorProductoService(),
    createMaterialProductoService = new CreateMaterialProductoService(),
    createTallaLetraProductoService = new CreateTallaLetraProductoService(),
    createTallaNumeroProductoService = new CreateTallaNumeroProductoService(),
    createPesoProductoService = new CreatePesoProductoService(),
    createAtributoService = new CreateAtributoService(),
    createDimensionesProductoService = new CreateDimensionesProductoService()
  ) {
    this.createProductoService = createProductoService;
    this.createAtributoProductoService = createAtributoProductoService;
    this.createColorProductoService = createColorProductoService;
    this.createMaterialProductoService = createMaterialProductoService;
    this.createTallaLetraProductoService = createTallaLetraProductoService;
    this.createTallaNumeroProductoService = createTallaNumeroProductoService;
    this.createPesoProductoService = createPesoProductoService;
    this.createAtributoService = createAtributoService;
    this.createDimensionesProductoService = createDimensionesProductoService;
  }

  /**
   * @method createProducto
   * @description Crea un nuevo producto y sus relaciones en una transacción
   * @param {Object} data - Datos del producto y sus relaciones
   * @param {string} data.sku - SKU del producto
   * @param {string} data.nombre - Nombre del producto
   * @param {string} data.descripcion - Descripción del producto
   * @param {number} data.sub_categoria_id - ID de la subcategoría
   * @param {number} data.genero_id - ID del género
   * @param {number} data.marca_id - ID de la marca
   * @param {number} data.precio - Precio del producto
   * @param {Array<Object>} [data.atributos] - Lista de atributos del producto
   * @param {number} [data.color_id] - ID del color
   * @param {Object} [data.dimensiones] - Dimensiones del producto
   * @param {Array<number>} [data.material_id] - Lista de IDs de materiales
   * @param {Array<number>} [data.talla_letra_id] - Lista de IDs de tallas letra
   * @param {Array<number>} [data.talla_numerica_id] - Lista de IDs de tallas numéricas
   * @param {Object} [data.peso] - Peso del producto
   * @returns {Promise<Object>} Resultado de la creación con todas las relaciones
   * @throws {Error} Si ocurre un error durante la transacción
   */
  createProducto = async (data) => {
    const {
      sku,
      nombre,
      descripcion,
      sub_categoria_id,
      genero_id,
      marca_id,
      precio,
      atributos,
      color_id,
      dimensiones,
      material_id,
      talla_letra_id,
      talla_numerica_id,
      peso,
    } = data;

    const INFO = "No aplica;"

    const producto = {sku, nombre, descripcion, sub_categoria_id, genero_id, marca_id, precio};

    const transaction = await sequelize.transaction({isolationLevel: sequelize.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,});
    try{
      const record1 = await this.createProductoService.execute(producto, transaction);
      
      if(!record1 || !record1.id){
        throw new Error("Error al intentar registrar el producto.")
      };

      const producto_id = record1.id;
      
      const record2 = atributos ? await this.grabarAtributos(atributos, transaction) : [];
      const record3 = await this.grabarAtributosProducto(producto_id, record2, transaction);
      const record4 = color_id ? await this.createColorProductoService.execute({producto_id, color_id}, transaction) : INFO;
      if(dimensiones) dimensiones.producto_id = producto_id;
      const record5 = dimensiones ? await this.createDimensionesProductoService.execute(dimensiones,transaction): INFO;
      const record6 = material_id?.length > 0 ? await this.grabarMateriales(producto_id, material_id, transaction) : INFO;
      const record7 = talla_letra_id?.length > 0 ? await this.grabarTallasLetras(producto_id, talla_letra_id, transaction) : INFO;
      const record8 = talla_numerica_id?.length > 0 ? await this.grabarTallasNumericas(producto_id, talla_numerica_id, transaction) : INFO;
      if(peso)peso.producto_id = producto_id;
      const record9 = peso ? await this.createPesoProductoService.execute(peso, transaction) : INFO;
      
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
      await transaction.rollback();
      throw error;
    }
  };

  /**
   * @method grabarAtributos
   * @description Crea los atributos del producto
   * @param {Array<Object>} atributos - Lista de atributos a crear
   * @param {Object} transaction - Transacción de base de datos
   * @returns {Promise<Array>} Atributos creados
   */
  grabarAtributos = async (atributos, transaction) => {
    return await Promise.all(atributos.map(async data => {
      return await this.createAtributoService.execute(data, transaction);
    }));
  }

  /**
   * @method grabarAtributosProducto
   * @description Crea las relaciones entre producto y atributos
   * @param {number} producto_id - ID del producto
   * @param {Array<Object>} atributos - Lista de atributos a relacionar
   * @param {Object} transaction - Transacción de base de datos
   * @returns {Promise<Array>} Relaciones creadas
   */
  grabarAtributosProducto = async (producto_id, atributos, transaction) => {
    return await Promise.all(atributos.map(async elem => {
      return await this.createAtributoProductoService.execute({producto_id, atributo_id: elem.id}, transaction);
    }));
  }

  /**
   * @method grabarMateriales
   * @description Crea las relaciones entre producto y materiales
   * @param {number} producto_id - ID del producto
   * @param {Array<number>} materiales - Lista de IDs de materiales
   * @param {Object} transaction - Transacción de base de datos
   * @returns {Promise<Array>} Relaciones creadas
   */
  grabarMateriales = async (producto_id, materiales, transaction) => {
    const results = await Promise.all(materiales.map(async elem => {
      return await this.createMaterialProductoService.execute({producto_id, material_id: elem}, transaction);
    }));
    return results;
  }

  /**
   * @method grabarTallasLetras
   * @description Crea las relaciones entre producto y tallas letra
   * @param {number} producto_id - ID del producto
   * @param {Array<number>} tallas - Lista de IDs de tallas letra
   * @param {Object} transaction - Transacción de base de datos
   * @returns {Promise<Array>} Relaciones creadas
   */
  grabarTallasLetras = async (producto_id, tallas, transaction) => {
    const results = await Promise.all(tallas.map(async elem => {
      return await this.createTallaLetraProductoService.execute({producto_id, talla_letra_id: elem}, transaction);
    }));
    return results;
  }

  /**
   * @method grabarTallasNumericas
   * @description Crea las relaciones entre producto y tallas numéricas
   * @param {number} producto_id - ID del producto
   * @param {Array<number>} tallas - Lista de IDs de tallas numéricas
   * @param {Object} transaction - Transacción de base de datos
   * @returns {Promise<Array>} Relaciones creadas
   */
  grabarTallasNumericas = async (producto_id, tallas, transaction) => {
    const results = await Promise.all(tallas.map(async elem => {
      return await this.createTallaNumeroProductoService.execute({producto_id, talla_numerica_id: elem}, transaction);
    }));
    return results;
  }
}

export default CreateProductoOrchestrator;



