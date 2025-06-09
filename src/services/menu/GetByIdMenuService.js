/**
 * Servicio para obtener un menú por su ID
 * @class GetByIdMenuService
 */
class GetByIdMenuService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de un menú por su ID
     * @param {string|number} id - ID del menú a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el menú si está eliminado
     * @returns {Promise<Object>} Menú encontrado
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Menú no encontrado');
        }
        return result;
    }
}

export default GetByIdMenuService;