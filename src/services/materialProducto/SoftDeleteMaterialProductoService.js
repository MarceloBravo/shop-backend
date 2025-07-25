/**
 * Servicio para realizar borrado lógico de una relación material-producto
 * @class SoftDeleteMaterialProductoService
 */
class SoftDeleteMaterialProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales-producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado lógico de una relación material-producto
     * @param {string|number} id - ID de la relación material-producto a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Relación material-producto no encontrada');
        }
        return await this.repository.softDelete(id, transaction);
    }
}

export default SoftDeleteMaterialProductoService;