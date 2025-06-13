import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva talla numérica
 * @class CreateTallaNumeroService
 */
class CreateTallaNumeroService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas numéricas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva talla numérica
     * @param {Object} data - Datos de la talla numérica a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Talla numérica creada
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateTallaNumeroService;