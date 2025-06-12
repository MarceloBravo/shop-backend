/**
 * Servicio para realizar borrado físico de una pantalla
 * @class HardDeletePantallaService
 */
class HardDeletePantallaService {
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
     * Ejecuta el borrado físico de una pantalla
     * @param {string|number} id - ID de la pantalla a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Pantalla no encontrada');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeletePantallaService;