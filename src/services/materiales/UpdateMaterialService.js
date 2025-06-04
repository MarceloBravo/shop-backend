/**
 * Servicio para actualizar un material
 * @class UpdateMaterialService
 */
class UpdateMaterialService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de un material
     * @param {number} id - ID del material a actualizar
     * @param {Object} data - Datos del material a actualizar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la actualización
     * @returns {Promise<Object>} Material actualizado
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateMaterialService;