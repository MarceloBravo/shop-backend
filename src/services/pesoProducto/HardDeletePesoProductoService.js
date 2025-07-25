/**
 * Servicio para realizar eliminación permanente de registros de peso de productos
 * @class HardDeletePesoProductoService
 */
class HardDeletePesoProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de pesos de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la eliminación permanente de un registro de peso
     * @param {string|number} id - ID del registro de peso a eliminar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Registro de peso no encontrado');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeletePesoProductoService;