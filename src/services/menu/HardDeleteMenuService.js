/**
 * Servicio para realizar borrado físico de un menú
 * @class HardDeleteMenuService
 */
class HardDeleteMenuService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            const error = new Error('El repositorio es requerido');
            error.code = 400;
            throw error;
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado físico de un menú
     * @param {string|number} id - ID del menú a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            const error = new Error('Menú no encontrado');
            error.code = 400;
            throw error;
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteMenuService;