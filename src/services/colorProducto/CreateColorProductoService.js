import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo color de producto
 * @class CreateColorProductoService
 */
class CreateColorProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de un nuevo color de producto
     * @param {Object} data - Datos del color de producto a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Color de producto creado
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data, true, transaction);
        return await this.repository.create(data, transaction);
    }
}

export default CreateColorProductoService;