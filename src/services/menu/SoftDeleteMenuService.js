/**
 * Servicio para realizar borrado lógico de un menú
 * @class SoftDeleteMenuService
 */
class SoftDeleteMenuService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado lógico de un menú
     * @param {string|number} id - ID del menú a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            const error = new Error('Menú no encontrado');
            error.code = 400;
            throw error;
        }
        const result = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteMenuService;