/**
 * Servicio para realizar borrado lógico de una pantalla
 * @class SoftDeletePantallaService
 */
class SoftDeletePantallaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de pantallas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado lógico de una pantalla
     * @param {string|number} id - ID de la pantalla a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Pantalla no encontrada');
        }
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeletePantallaService;