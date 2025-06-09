/**
 * Servicio para realizar borrado físico de un color de producto
 * @class HardDeleteColorProductoService
 */
class HardDeleteColorProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado físico de un color de producto
     * @param {string|number} id - ID del color de producto a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Color de producto no encontrado');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteColorProductoService;