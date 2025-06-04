/**
 * Servicio para obtener una acción de pantalla por su ID
 * @class GetByIdAccionesPantallaService
 */
class GetByIdAccionesPantallaService {
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
     * Ejecuta la obtención de una acción de pantalla por su ID
     * @param {number} id - ID de la acción de pantalla a obtener
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las acciones no eliminadas
     * @returns {Promise<Object>} Acción de pantalla encontrada
     */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdAccionesPantallaService;