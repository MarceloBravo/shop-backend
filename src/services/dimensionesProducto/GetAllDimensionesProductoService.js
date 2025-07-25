/**
 * Servicio para obtener todas las dimensiones de producto
 * @class GetAllDimensionesProductoService
 */
class GetAllDimensionesProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de dimensiones de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todas las dimensiones de producto
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las dimensiones de producto eliminadas
     * @returns {Promise<Array>} Lista de dimensiones de producto
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllDimensionesProductoService;