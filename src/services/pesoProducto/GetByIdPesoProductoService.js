/**
 * Servicio para obtener un registro de peso de producto por su ID
 * @class GetByIdPesoProductoService
 */
class GetByIdPesoProductoService {
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
     * Ejecuta la obtención de un registro de peso por su ID
     * @param {string|number} id - ID del registro de peso a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el registro si está eliminado
     * @returns {Promise<Object>} Registro de peso encontrado
     * @throws {Error} Si no se encuentra el registro
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Registro de peso no encontrado');
        }
        return result;
    }
}

export default GetByIdPesoProductoService;