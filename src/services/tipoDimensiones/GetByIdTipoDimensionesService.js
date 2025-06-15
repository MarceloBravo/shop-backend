/**
 * Servicio para obtener un tipo de dimensión por su ID
 * @class GetByIdTipoDimensionesService
 */
class GetByIdTipoDimensionesService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tipos de dimensión
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de un tipo de dimensión por su ID
     * @param {string|number} id - ID del tipo de dimensión a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el tipo de dimensión si está eliminado
     * @returns {Promise<Object>} Tipo de dimensión encontrado
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Tipo de dimensión no encontrado');
        }
        return result;
    }
}

export default GetByIdTipoDimensionesService;
