/**
 * Servicio para realizar borrado físico de una talla numérica
 * @class HardDeleteTallaNumeroService
 */
class HardDeleteTallaNumeroService {
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
     * Ejecuta el borrado físico de una talla numérica
     * @param {string|number} id - ID de la talla numérica a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     * @throws {Error} Si la talla numérica no es encontrada
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Talla numérica no encontrada');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteTallaNumeroService;
