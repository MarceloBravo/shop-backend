/**
 * Servicio para obtener un atributo por su ID
 * @class GetByIdAtributoService
 */
class GetByIdAtributoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de atributos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de un atributo por su ID
     * @param {number} id - ID del atributo a obtener
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los registros eliminados lógicamente
     * @returns {Promise<Object>} Atributo encontrado
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if(!result) {
            const error = new Error('Atributo no encontrado');
            error.code = 404;
            throw error;
        }
        return result;
    }
}   

export default GetByIdAtributoService;