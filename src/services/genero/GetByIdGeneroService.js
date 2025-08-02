/**
 * Servicio para obtener un registro de género por su ID
 * @class GetByIdGeneroService
 */
class GetByIdGeneroService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de géneros
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de un registro de género por su ID
     * @param {string|number} id - ID del género a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe excluir el registro si está eliminado
     * @returns {Promise<Object>} Género encontrado
     * @throws {Error} Si el género no es encontrado
     */
    execute = async (id, paranoid = true) => {
        const data = await this.repository.getById(id, paranoid);
        if(!data){
            const error = new Error('Regístro no encontrado');
            error.code = 404;
            throw error;
        }
        return data;
    }
}

export default GetByIdGeneroService;