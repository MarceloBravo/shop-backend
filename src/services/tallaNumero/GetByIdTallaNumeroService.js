/**
 * Servicio para obtener una talla numérica por su ID
 * @class GetByIdTallaNumeroService
 */
class GetByIdTallaNumeroService {
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
     * Ejecuta la obtención de una talla numérica por su ID
     * @param {string|number} id - ID de la talla numérica a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la talla si está eliminada
     * @returns {Promise<Object>} Talla numérica encontrada
     * @throws {Error} Si la talla numérica no es encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            const error = new Error('Registro no encontrado');
            error.code = 404;
            throw error;
        }
        return result;
    }
}

export default GetByIdTallaNumeroService;
