import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un atributo
 * @class UpdateAtributoService
 */
class UpdateAtributoService {
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
     * Ejecuta la actualización de un atributo
     * @param {number} id - ID del atributo a actualizar
     * @param {Object} data - Datos del atributo a actualizar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la actualización
     * @returns {Promise<Object>} Atributo actualizado
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data, this.repository);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateAtributoService;