/**
 * Servicio para realizar borrado lógico de una categoría
 * @class SoftDeleteCategoriaService
 */
class SoftDeleteCategoriaService {
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
     * Ejecuta el borrado lógico de una categoría
     * @param {string|number} id - ID de la categoría a borrar
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id) => {
        return await this.repository.softDelete(id);
    }
}

export default SoftDeleteCategoriaService;