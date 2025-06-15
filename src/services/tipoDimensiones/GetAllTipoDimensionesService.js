/**
 * Servicio para obtener todos los tipos de dimensión
 * @class GetAllTipoDimensionesService
 */
class GetAllTipoDimensionesService {
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
     * Ejecuta la obtención de todos los tipos de dimensión
     * @param {boolean} [paranoid=true] - Indica si se deben excluir los registros eliminados
     * @returns {Promise<Array>} Lista de tipos de dimensión
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll([['nombre', 'ASC']], paranoid);
    }
}

export default GetAllTipoDimensionesService;