/**
 * Servicio para realizar borrado físico de un color
 * @class HardDeleteColorService
 */
class HardDeleteColorService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado físico de un color
     * @param {string|number} id - ID del color a borrar
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Color no encontrado');
        }
        return await this.repository.hardDelete(id);
    }
}

export default HardDeleteColorService;