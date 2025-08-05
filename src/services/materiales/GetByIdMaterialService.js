/**
 * Servicio para obtener un material por su ID
 * @class GetByIdMaterialService
 */
class GetByIdMaterialService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de un material por su ID
     * @param {number} id - ID del material a obtener
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los registros eliminados lógicamente
     * @returns {Promise<Object>} Material encontrado
     */
    execute = async (id, paranoid = true) => {
        const material = await this.repository.getById(id, paranoid);
        if (!material) {
            const error = new Error('Registro no encontrado');
            error.code = 404;
            throw error;
        }
        return material;
    }
}

export default GetByIdMaterialService;