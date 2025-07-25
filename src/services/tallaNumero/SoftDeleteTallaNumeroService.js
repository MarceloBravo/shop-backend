/**
 * Servicio para realizar borrado lógico de una talla numérica
 * @class SoftDeleteTallaNumeroService
 */
class SoftDeleteTallaNumeroService {
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
     * Ejecuta el borrado lógico de una talla numérica
     * @param {string|number} id - ID de la talla numérica a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     * @throws {Error} Si la talla numérica no es encontrada
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Talla numérica no encontrada');
        }
        const record = await this.repository.softDelete(id, transaction);
        return record && record.deleted_at !== null;
    }
}

export default SoftDeleteTallaNumeroService;