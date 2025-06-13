/**
 * Servicio para obtener una talla letra por su ID
 * @class GetByIdTallaLetraService
 */
class GetByIdTallaLetraService {
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
     * Ejecuta la obtención de una talla letra por su ID
     * @param {string|number} id - ID de la talla letra a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la talla letra si está eliminada
     * @returns {Promise<Object>} Talla letra encontrada
     * @throws {Error} Si la talla letra no es encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Talla letra no encontrada');
        }
        return result;
    }
}

export default GetByIdTallaLetraService;
