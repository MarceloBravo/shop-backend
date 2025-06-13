/**
 * Servicio para realizar eliminación lógica de registros de peso de productos
 * @class SoftDeletePesoProductoService
 */
class SoftDeletePesoProductoService {
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
     * Ejecuta la eliminación lógica de un registro de peso
     * @param {string|number} id - ID del registro de peso a eliminar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Registro de peso no encontrado');
        }
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeletePesoProductoService;