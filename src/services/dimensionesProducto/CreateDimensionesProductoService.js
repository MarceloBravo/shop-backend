import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva dimensión de producto
 * @class CreateDimensionesProductoService
 */
class CreateDimensionesProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de dimensiones de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva dimensión de producto
     * @param {Object} data - Datos de la dimensión de producto a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Dimensión de producto creada
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateDimensionesProductoService;