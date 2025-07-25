/**
 * Servicio para obtener todas las pantallas
 * @class GetAllPantallaService
 */
class GetAllPantallaService {
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
     * Ejecuta la obtención de todas las pantallas
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las pantallas eliminadas
     * @returns {Promise<Array>} Lista de pantallas
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllPantallaService;