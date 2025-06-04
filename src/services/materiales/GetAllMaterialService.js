/**
 * Servicio para obtener todos los materiales
 * @class GetAllMaterialService
 */
class GetAllMaterialService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todos los materiales
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los registros eliminados lógicamente
     * @returns {Promise<Array>} Lista de materiales
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllMaterialService;