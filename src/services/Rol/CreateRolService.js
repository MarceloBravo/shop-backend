import validaDatos from './ValidaDatos.js.js';

/**
 * Servicio para crear un nuevo rol
 * @class CreateRolService
 */
class CreateRolService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de roles
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de un nuevo rol
     * @param {Object} data - Datos del rol a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Rol creado
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateRolService;