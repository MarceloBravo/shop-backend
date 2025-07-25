/**
 * Servicio para obtener una relación material-producto por su ID
 * @class GetByIdMaterialProductoService
 */
class GetByIdMaterialProductoService {
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
     * Ejecuta la obtención de una relación material-producto por su ID
     * @param {string|number} id - ID de la relación material-producto a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la relación si está eliminada
     * @returns {Promise<Object>} Relación material-producto encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Relación material-producto no encontrada');
        }
        return result;
    }
}

export default GetByIdMaterialProductoService;