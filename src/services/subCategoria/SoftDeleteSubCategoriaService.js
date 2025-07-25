/**
 * Servicio para realizar borrado lógico de una subcategoría
 * @class SoftDeleteSubCategoriaService
 */
class SoftDeleteSubCategoriaService {
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
     * Ejecuta el borrado lógico de una subcategoría
     * @param {string|number} id - ID de la subcategoría a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Subcategoría no encontrada');
        }
        const record = await this.repository.softDelete(id, transaction);
        return record && record.deleted_at !== null;
    }
}

export default SoftDeleteSubCategoriaService;