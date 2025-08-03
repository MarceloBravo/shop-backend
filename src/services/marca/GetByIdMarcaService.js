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
     * @throws {Error} Si la marca no existe
     */
    execute = async (id, paranoid = true) => {
        const marca = await this.repository.getById(id, paranoid);
        if (!marca) {
            const error = new Error('Marca no encontrada');
            error.code = 404;
            throw error;
        }
        return marca;
    }
}

export default GetByIdMarcaService;