/**
 * Servicio para obtener todas las acciones de pantalla
 * @class GetAllAccionesPantallaService
 */
class GetAllAccionesPantallaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de acciones de pantalla
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todas las acciones de pantalla
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las acciones no eliminadas
     * @returns {Promise<Array>} Lista de acciones de pantalla
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllAccionesPantallaService;