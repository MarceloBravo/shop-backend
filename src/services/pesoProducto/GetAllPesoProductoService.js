/**
 * Servicio para obtener todos los registros de peso de productos
 * @class GetAllPesoProductoService
 */
class GetAllPesoProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de pesos de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todos los registros de peso
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los registros eliminados
     * @returns {Promise<Array>} Lista de registros de peso
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllPesoProductoService;