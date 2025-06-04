/**
 * Servicio para realizar borrado lógico de un color
 * @class SoftDeleteColorService
 */
class SoftDeleteColorService {
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
     * Ejecuta el borrado lógico de un color
     * @param {string|number} id - ID del color a borrar
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Color no encontrado');
        }
        return await this.repository.softDelete(id);
    }
}

export default SoftDeleteColorService;