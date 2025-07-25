/**
 * Servicio para realizar borrado físico de una asociación entre talla numérica y producto
 * @class HardDeleteTallaNumeroProductoService
 */
class HardDeleteTallaNumeroProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas numéricas-producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado físico de una asociación
     * @param {string|number} id - ID de la asociación a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Asociación no encontrada');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteTallaNumeroProductoService;