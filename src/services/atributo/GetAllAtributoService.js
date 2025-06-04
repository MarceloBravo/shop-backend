/**
 * Servicio para obtener todos los atributos
 * @class GetAllAtributoService
 */
class GetAllAtributoService {
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
     * Ejecuta la obtención de todos los atributos
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los registros eliminados lógicamente
     * @returns {Promise<Array>} Lista de atributos
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllAtributoService;