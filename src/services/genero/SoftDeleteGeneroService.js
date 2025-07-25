/**
 * Servicio para realizar un borrado lógico de un registro de género
 * @class SoftDeleteGeneroService
 */
class SoftDeleteGeneroService {
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
     * Ejecuta el borrado lógico de un registro de género
     * @param {string|number} id - ID del género a eliminar
     * @returns {Promise<Object>} Género eliminado
     * @throws {Error} Si el género no existe
     */
    execute = async (id) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Género no encontrado');
        }
        return await this.repository.softDelete(id);
    }
}

export default SoftDeleteGeneroService;