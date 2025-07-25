import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva asociación entre talla letra y producto
 * @class CreateTallaLetraProductoService
 */
class CreateTallaLetraProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas letra producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva asociación
     * @param {Object} data - Datos de la asociación a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Asociación creada
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateTallaLetraProductoService;