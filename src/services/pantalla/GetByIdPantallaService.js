/**
 * Servicio para obtener una pantalla por su ID
 * @class GetByIdPantallaService
 */
class GetByIdPantallaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de pantallas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una pantalla por su ID
     * @param {string|number} id - ID de la pantalla a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la pantalla si está eliminada
     * @returns {Promise<Object>} Pantalla encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Pantalla no encontrada');
        }
        return result;
    }
}

export default GetByIdPantallaService;