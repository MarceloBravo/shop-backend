/**
 * Servicio para realizar borrado físico de una categoría
 * @class HardDeleteCategoriaService
 */
class HardDeleteCategoriaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de categorías
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado físico de una categoría
     * @param {string|number} id - ID de la categoría a borrar
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Categoría no encontrado');
        }
        return await this.repository.hardDelete(id);
    }
}

export default HardDeleteCategoriaService;