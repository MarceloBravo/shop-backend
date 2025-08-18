import { sequelize } from '../../../config/database.js';
import UpdateProductoService from '../../services/producto/UpdateProductoService.js';
import UpdateAtributoProductoService from '../../services/atributoProducto/UpdateAtributoProductoService.js';
import UpdateColorProductoService from '../../services/colorProducto/UpdateColorProductoService.js';
import UpdateDimensionesProductoService from '../../services/dimensionesProducto/UpdateDimensionesProductoService.js';
import UpdateMaterialProductoService from '../../services/materialProducto/UpdateMaterialProductoService.js';
import UpdateTallaLetraProductoService from '../../services/tallaLetraProducto/UpdateTallaLetraProductoService.js';
import UpdateTallaNumeroProductoService from '../../services/tallaNumeroProducto/UpdateTallaNumeroProductoService.js';
import UpdatePesoProductoService from '../../services/pesoProducto/UpdatePesoProductoService.js';
import UpdateAtributoService from '../../services/atributo/UpdateAtributoService.js';

import CreateAtributoProductoService from '../../services/atributoProducto/CreateAtributoProductoService.js';
import CreateAtributoService from '../../services/atributo/CreateAtributoService.js';
import CreateMaterialProductoService from '../../services/materialProducto/CreateMaterialProductoService.js';
import CreateTallaLetraProductoService from '../../services/tallaLetraProducto/CreateTallaLetraProductoService.js';
import CreateTallaNumeroProductoService from '../../services/tallaNumeroProducto/CreateTallaNumeroProductoService.js';

import HardDeleteAtributoProductoService from '../../services/atributoProducto/HardDeleteAtributoProductoService.js';
import HardDeleteColorProductoService from '../../services/colorProducto/HardDeleteColorProductoService.js';
import HardDeleteDimensionesProductoService from '../../services/dimensionesProducto/HardDeleteDimensionesProductoService.js';
import HardDeleteMaterialProductoService from '../../services/materialProducto/HardDeleteMaterialProductoService.js';
import HardDeleteTallaLetraProductoService from '../../services/tallaLetraProducto/HardDeleteTallaLetraProductoService.js';
import HardDeleteTallaNumeroProductoService from '../../services/tallaNumeroProducto/HardDeleteTallaNumeroProductoService.js';
import HardDeletePesoProductoService from '../../services/pesoProducto/HardDeletePesoProductoService.js';

import ProductoRepository from '../../repositories/ProductoRepository.js';
import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';
import ColorProductoRepository from '../../repositories/ProductoRepository.js';
import MaterialProductoRepository from '../../repositories/MaterialProductoRepository.js';
import TallaLetraProductoRepository from '../../repositories/TallaLetraProductoRepository.js';
import TallaNumeroProductoRepository from '../../repositories/TallaNumeroProductoRepository.js';
import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';
import AtributosRepository from '../../repositories/AtributosRepository.js';
import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';

const INFO = 'No Aplica';

/**
 * @class UpdateProductoOrchestrator
 * @description Orquestador para la actualización de productos y sus relaciones
 */
class UpdateProductoOrchestrator {
    /**
     * @constructor
     * @description Inicializa las instancias de servicios necesarias para la actualización
     * @param {ProductoRepository} productoRepository - Repositorio de productos
     * @param {AtributoProductoRepository} atributoProductoRepository - Repositorio de atributos de producto
     * @param {ColorProductoRepository} colorProductoRepository - Repositorio de colores de producto
     * @param {MaterialProductoRepository} materialProductoRepository - Repositorio de materiales de producto
     * @param {TallaLetraProductoRepository} tallaLetraProductoRepository - Repositorio de tallas letra de producto
     * @param {TallaNumeroProductoRepository} tallaNumeroProductoRepository - Repositorio de tallas numéricas de producto
     * @param {PesoProductoRepository} pesoProductoRepository - Repositorio de pesos de producto
     * @param {AtributosRepository} atributosRepository - Repositorio de atributos
     * @param {DimensionesProductoRepository} dimensionesProductoRepository - Repositorio de dimensiones de producto
     */
    constructor(
        productoRepository = new ProductoRepository(),
        atributoProductoRepository = new AtributoProductoRepository(),
        colorProductoRepository = new ColorProductoRepository(),
        materialProductoRepository = new MaterialProductoRepository(),
        tallaLetraProductoRepository = new TallaLetraProductoRepository(),
        tallaNumeroProductoRepository = new TallaNumeroProductoRepository(),
        pesoProductoRepository = new PesoProductoRepository(),
        atributosRepository = new AtributosRepository(),
        dimensionesProductoRepository = new DimensionesProductoRepository()
    ) {
        this.updateProductoService = new UpdateProductoService(productoRepository);
        this.updateAtributoProductoService = new UpdateAtributoProductoService(atributoProductoRepository);
        this.updateColorProductoService = new UpdateColorProductoService(colorProductoRepository);
        this.updateDimensionesProductoService = new UpdateDimensionesProductoService(dimensionesProductoRepository);
        this.updateMaterialProductoService = new UpdateMaterialProductoService(materialProductoRepository);
        this.updateTallaLetraProductoService = new UpdateTallaLetraProductoService(tallaLetraProductoRepository);
        this.updateTallaNumeroProductoService = new UpdateTallaNumeroProductoService(tallaNumeroProductoRepository);
        this.updatePesoProductoService = new UpdatePesoProductoService(pesoProductoRepository);
        this.updateAtributoService = new UpdateAtributoService(atributosRepository);
        
        this.createAtributoProductoService = new CreateAtributoProductoService(atributoProductoRepository);
        this.createAtributoService = new CreateAtributoService(atributosRepository);
        this.createMaterialProductoService = new CreateMaterialProductoService(materialProductoRepository);
        this.createTallaLetraProductoService = new CreateTallaLetraProductoService(tallaLetraProductoRepository);
        this.createTallaNumeroProductoService = new CreateTallaNumeroProductoService(tallaNumeroProductoRepository);
        this.hardDeleteAtributoProductoService = new HardDeleteAtributoProductoService(atributoProductoRepository);
        this.hardDeleteColorProductoService = new HardDeleteColorProductoService(colorProductoRepository);
        this.hardDeleteDimensionesProductoService = new HardDeleteDimensionesProductoService(dimensionesProductoRepository);
        this.hardDeleteMaterialProductoService = new HardDeleteMaterialProductoService(materialProductoRepository);
        this.hardDeleteTallaLetraProductoService = new HardDeleteTallaLetraProductoService(tallaLetraProductoRepository);
        this.hardDeleteTallaNumeroProductoService = new HardDeleteTallaNumeroProductoService(tallaNumeroProductoRepository);
        this.hardDeletePesoProductoService = new HardDeletePesoProductoService(pesoProductoRepository);
    }

    /**
     * @method updateProducto
     * @description Actualiza un producto y sus relaciones en una transacción
     * @param {number} producto_id - ID del producto a actualizar
     * @param {Object} data - Datos del producto y sus relaciones a actualizar
     * @param {Object} data.eliminados - Objeto con las relaciones a eliminar
     * @returns {Promise<Object>} Resultado de la actualización y eliminación
     * @throws {Error} Si ocurre un error durante la transacción
     */
    updateProducto = async (producto_id, data) => {
        const transaction = await sequelize.transaction();
        try {
            const resultActualizacion = await this.actualizarDatos(producto_id, data, transaction);
            const resultEliminados = data.eliminados ? await this.eliminarDatos(producto_id, data.eliminados, transaction) : INFO;
            
            await transaction.commit();

            return {
                actualizados: resultActualizacion,
                eliminados: resultEliminados
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * @method actualizarDatos
     * @description Actualiza los datos principales del producto y sus relaciones
     * @param {number} producto_id - ID del producto
     * @param {Object} data - Datos a actualizar
     * @param {Object} transaction - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de las actualizaciones
     */
    actualizarDatos = async (producto_id, data, transaction) => {
        const {
            sku,
            nombre,
            descripcion,
            sub_categoria_id,
            genero_id,
            marca_id,
            precio,
            atributos,
            color,
            dimensiones,
            material_id,
            talla_letra_id,
            talla_numerica_id,
            peso
        } = data;

        const dataProducto = { sku, nombre, descripcion, sub_categoria_id, genero_id, marca_id, precio };
        const producto = await this.updateProductoService.execute(producto_id, dataProducto, transaction);
        if(peso)peso.producto_id = producto_id;
        
        const atributosActualizados = atributos ? await this.actualizarAtributos(atributos, transaction) : [];
        const atributos_result = await this.actualizarAtributosProducto(producto_id, atributosActualizados, transaction);
        const color_result = color ? await this.updateColorProductoService.execute(color.id, { producto_id, color_id: color.color_id }, transaction) : INFO;
        if(dimensiones)dimensiones.producto_id = producto_id;
        const dimensiones_result = dimensiones ? await this.updateDimensionesProductoService.execute(dimensiones.id, dimensiones, transaction) : INFO;
        const material = material_id ? await this.grabarMateriales(producto_id, material_id, transaction) : INFO;
        const talla_letra = talla_letra_id ? await this.grabarTallasLetras(producto_id, talla_letra_id, transaction) : INFO;
        const talla_numero = talla_numerica_id ? await this.grabarTallasNumericas(producto_id, talla_numerica_id, transaction) : INFO;
        const peso_result = peso ? await this.updatePesoProductoService.execute(peso.id, peso, transaction) : INFO;

        return {
            producto,
            atributos: atributos_result,
            color: color_result?.data?.toJSON() ?? color_result,
            dimensiones: dimensiones_result?.data?.toJSON() ?? dimensiones_result,
            material,
            talla_letra,
            talla_numero,
            peso: peso_result?.data?.toJSON() ?? peso_result
        };
    }

    /**
     * @method actualizarAtributos
     * @description Actualiza o crea atributos del producto
     * @param {Array<Object>} atributos - Lista de atributos a actualizar
     * @param {Object} transaccion - Transacción de base de datos
     * @returns {Promise<Array>} Atributos actualizados
     */
    actualizarAtributos = async (atributos, transaccion) => {
        const result = await Promise.all(atributos.map(async elem => {
            if (elem.atributo.id) {
                elem.atributo = (await this.updateAtributoService.execute(elem.atributo.id, elem.atributo, transaccion)).data.toJSON();
            } else {
                elem.atributo = (await this.createAtributoService.execute(elem.atributo, transaccion)).toJSON();
            }
            return elem;
        }));
        return result;
    }

    /**
     * @method actualizarAtributosProducto
     * @description Actualiza o crea las relaciones entre producto y atributos
     * @param {number} producto_id - ID del producto
     * @param {Array<Object>} atributos - Lista de atributos a relacionar
     * @param {Object} transaccion - Transacción de base de datos
     * @returns {Promise<Array>} Relaciones actualizadas
     */
    actualizarAtributosProducto = async (producto_id, atributos, transaccion) => {
        return await Promise.all(atributos.map(async elem => {
            let result;
            if (elem.id) {
                result =  (await this.updateAtributoProductoService.execute(elem.id, {producto_id, atributo_id: elem.atributo.id }, transaccion));
                return result.data.toJSON();
            } else {
                result = (await this.createAtributoProductoService.execute({ producto_id, atributo_id: elem.atributo.id }, transaccion));
                return result.toJSON();
            }
        }));
    }

    /**
     * @method grabarMateriales
     * @description Actualiza o crea las relaciones entre producto y materiales
     * @param {number} producto_id - ID del producto
     * @param {Array<number>} materiales - Lista de IDs de materiales
     * @param {Object} transaction - Transacción de base de datos
     * @returns {Promise<Array>} Relaciones actualizadas
     */
    grabarMateriales = async (producto_id, materiales, transaction) => {
        const results = await Promise.all(materiales.map(async elem => {
            if (elem.id) {
                return await this.updateMaterialProductoService.execute(elem.id, { producto_id, material_id: elem }, transaction);
            } else {
                return await this.createMaterialProductoService.execute({ producto_id, material_id: elem }, transaction);
            }
        }));
        return results;
    }

    /**
     * @method grabarTallasLetras
     * @description Actualiza o crea las relaciones entre producto y tallas letra
     * @param {number} producto_id - ID del producto
     * @param {Array<number>} tallas - Lista de IDs de tallas letra
     * @param {Object} transaction - Transacción de base de datos
     * @returns {Promise<Array>} Relaciones actualizadas
     */
    grabarTallasLetras = async (producto_id, tallas, transaction) => {
        const results = await Promise.all(tallas.map(async elem => {
            if (elem.id) {
                return await this.updateTallaLetraProductoService.execute(elem.id, { producto_id, talla_letra_id: elem }, transaction);
            } else {
                return await this.createTallaLetraProductoService.execute({ producto_id, talla_letra_id: elem }, transaction);
            }
        }));
        return results;
    }

    /**
     * @method grabarTallasNumericas
     * @description Actualiza o crea las relaciones entre producto y tallas numéricas
     * @param {number} producto_id - ID del producto
     * @param {Array<number>} tallas - Lista de IDs de tallas numéricas
     * @param {Object} transaction - Transacción de base de datos
     * @returns {Promise<Array>} Relaciones actualizadas
     */
    grabarTallasNumericas = async (producto_id, tallas, transaction) => {
        const results = await Promise.all(tallas.map(async elem => {
            if (elem.id) {
                return await this.updateTallaNumeroProductoService.execute(elem.id, { producto_id, talla_numerica_id: elem }, transaction);
            } else {
                return await this.createTallaNumeroProductoService.execute({ producto_id, talla_numerica_id: elem }, transaction);
            }
        }));
        return results;
    }

    /**
     * @method eliminarDatos
     * @description Elimina las relaciones especificadas del producto
     * @param {number} producto_id - ID del producto
     * @param {Object} eliminados - Objeto con las relaciones a eliminar
     * @param {Object} transaction - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de las eliminaciones
     */
    eliminarDatos = async (producto_id, eliminados, transaction) => {
        const atributos = (eliminados.atributos) ?
            await Promise.all(eliminados.atributos.map(async (elem) => {
                return await this.hardDeleteAtributoProductoService.execute(elem, transaction);
            }))
            : null;

        const color = eliminados.color_id ? await this.hardDeleteColorProductoService.execute(id, { producto_id, color_id }, transaction) : null;
        const dimensiones = eliminados.dimensiones ? await this.hardDeleteDimensionesProductoService.execute(dimensiones.id, { producto_id, dimensiones }, transaction) : null;
        const material = eliminados.material_id ? await this.hardDeleteMaterialProductoService.execute(eliminados.material_id, transaction) : null;
        const talla_letra = eliminados.talla_letra_id ? await this.hardDeleteTallaLetraProductoService.execute(eliminados.talla_letra_id, transaction) : null;
        const talla_numero = eliminados.talla_numerica_id ? await this.hardDeleteTallaNumeroProductoService.execute(eliminados.talla_numerica_id, transaction) : null;
        const peso = eliminados.peso?.id ? await this.hardDeletePesoProductoService.execute(eliminados.peso.id, transaction) : null;

        const result = { atributos, color, dimensiones, material, talla_letra, talla_numero, peso };

                return Object.fromEntries(
            Object.entries(result).filter(([_, valor]) => {
                if (valor === null) return false;
                if (Array.isArray(valor)) {
                    return valor.some(v => v.result);
                }
                return valor.result;
            })
        );
    }
}

export default UpdateProductoOrchestrator;