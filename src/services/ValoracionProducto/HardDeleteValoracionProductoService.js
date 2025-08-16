/**
 * Servicio para realizar borrado físico de una valoración de producto
 * @class HardDeleteValoracionProductoService
 */
class HardDeleteValoracionProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de valoraciones de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado físico de una valoración de producto
     * @param {string|number} id - ID de la valoración a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            const error = new Error('Valoración no encontrada');
            error.code = 404;
            throw error;
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteValoracionProductoService;