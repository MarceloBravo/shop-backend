/**
 * Servicio para obtener una marca por su ID
 * @class GetByIdMarcaService
 */
class GetByIdMarcaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de marcas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una marca por su ID
     * @param {number} id - ID de la marca a obtener
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas
     * @returns {Promise<Object>} Marca encontrada
     */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdMarcaService;