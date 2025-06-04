import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo atributo
 * @class CreateAtributoService
 */
class CreateAtributoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de atributos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de un nuevo atributo
     * @param {Object} data - Datos del atributo a crear
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la creación
     * @returns {Promise<Object>} Atributo creado
     */
    execute = async (data, transaction = null) => {
        validaDatos(data, this.repository);
        return await this.repository.create(data, transaction);
    }
}

export default CreateAtributoService;