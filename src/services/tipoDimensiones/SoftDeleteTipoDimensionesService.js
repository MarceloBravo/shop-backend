/**
 * Servicio para realizar borrado lógico de un tipo de dimensión
 * @class SoftDeleteTipoDimensionesService
 */
class SoftDeleteTipoDimensionesService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tipos de dimensión
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Se encarga de marcar un regístro como eliminado.
     * @param {number} [id] - ID del regístro a eliminar con borrado suave 
     * @param {object} transaction - Objeto que puede contiene la transacción en la cual se borrará el regístro
     * @returns {Promise<Object>} - Resultado de la operación.
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Tipo de dimensión no encontrado');
        }
        return await this.repository.softDelete(id, transaction);
    }
}

export default SoftDeleteTipoDimensionesService;