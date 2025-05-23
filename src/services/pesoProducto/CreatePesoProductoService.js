import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear nuevos registros de peso de producto
 * @class
 * @description Gestiona la creación de registros de peso para productos en el sistema
 */
class CreatePesoProductoService {
    /**
     * Crea una instancia del servicio de creación de peso de producto
     * @param {PesoProductoRepository} repository - Repositorio para operaciones con pesos de productos
     */
    constructor(repository = new PesoProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Crea un nuevo registro de peso para un producto
     * @param {Object} data - Datos del peso del producto a crear:
     *      @param {number} data.peso - El peso del producto
     *      @param {number} data.id_producto - ID del producto asociado
     *      @param {number} [data.id_unidad_medida] - ID de la unidad de medida del peso
     * 
     * @param {Object} [transaction] - Transacción de Sequelize para operaciones atómicas
     * @returns {Promise<Object>} Nuevo registro de peso creado
     * @throws {Error} Si la validación falla o hay un error en la creación
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreatePesoProductoService;