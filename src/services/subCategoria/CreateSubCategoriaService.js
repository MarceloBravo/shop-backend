import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva subcategoría
 * @class CreateSubCategoriaService
 */
class CreateSubCategoriaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de subcategorías
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva subcategoría
     * @param {Object} data - Datos de la subcategoría a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Subcategoría creada
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateSubCategoriaService;