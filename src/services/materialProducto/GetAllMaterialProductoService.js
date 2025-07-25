/**
 * Servicio para obtener todas las relaciones material-producto
 * @class GetAllMaterialProductoService
 */
class GetAllMaterialProductoService {
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
     * Ejecuta la obtención de todas las relaciones material-producto
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las relaciones eliminadas
     * @returns {Promise<Array>} Lista de relaciones material-producto
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllMaterialProductoService;