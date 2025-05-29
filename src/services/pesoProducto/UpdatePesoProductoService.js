import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar los datos de peso de un producto
 * @class
 * @description Gestiona la actualización de información del peso de productos en el sistema
 */
class UpdatePesoProductoService {
    /**
     * Crea una instancia del servicio de actualización de peso de producto
     * @param {PesoProductoRepository} repository - Repositorio para operaciones con pesos de productos
     */
    constructor(repository = new PesoProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Actualiza el registro de peso de un producto
     * @param {number} id - Identificador único del registro de peso a actualizar
     * @param {Object} data - Datos del peso del producto a actualizar:
     *      @param {number} data.peso - El peso del producto
     *      @param {number} data.id_producto - ID del producto asociado
     *      @param {number} [data.id_unidad_medida] - ID de la unidad de medida del peso
     * @param {Object} [transaction] - Transacción de Sequelize para operaciones atómicas
     * 
     * @returns {Promise<Object>} Registro de peso actualizado
     * @throws {Error} Si la validación falla o hay un error en la actualización
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data, true, transaction);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdatePesoProductoService;