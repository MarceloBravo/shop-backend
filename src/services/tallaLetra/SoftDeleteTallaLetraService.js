/**
 * Servicio para realizar borrado lógico de una talla letra
 * @class SoftDeleteTallaLetraService
 */
class SoftDeleteTallaLetraService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas letra
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado lógico de una talla letra
     * @param {string|number} id - ID de la talla letra a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     * @throws {Error} Si la talla letra no es encontrada
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Talla letra no encontrada');
        }
        const record = await this.repository.softDelete(id, transaction);
        return record && record.deleted_at !== null;
    }
}

export default SoftDeleteTallaLetraService;