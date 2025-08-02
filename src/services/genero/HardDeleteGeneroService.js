
/**
 * Servicio para realizar un borrado permanente de un registro de género
 * @class HardDeleteGeneroService
 */
class HardDeleteGeneroService {
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
     * Ejecuta el borrado permanente de un registro de género
     * @param {string|number} id - ID del género a eliminar
     * @returns {Promise<Object>} Género eliminado
     * @throws {Error} Si el género no existe
     */
    execute = async (id) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            const error = new Error('Género no encontrado');
            error.code = 404;
            throw error;
        }
        return await this.repository.hardDelete(id);
    }
}

export default HardDeleteGeneroService;