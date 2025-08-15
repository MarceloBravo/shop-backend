/**
 * Servicio encargado de marcar un registro de usuario como eliminado (soft-delete).
 * @class SoftDeleteUsuarioService
 */
class SoftDeleteUsuarioService {
    /**
     * @param repository - El repositorio para interactuar con la base de datos o un Mock.
     * @throws {Error} Si el repositorio no es proporcionado.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error("Se requiere un repositorio para SoftDeleteUsuarioService.");
        }
        this.repository = repository;
    }

    /**
     * Marca un registro como eliminado.
     * @param {number} id - ID del registro a eliminar con borrado suave.
     * @param {Object} transaction - Objeto que contiene la transacción en la cual se eliminará el registro.
     * @returns {Promise<void>} - Indica que la operación se completó.
     */
    execute = async (id, transaction) => {
        const existe = await this.repository.getById(id, true);
        if (!existe) {
            const error = new Error("El usuario no existe.");
            error.code = 404;
            throw error;
        }
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteUsuarioService;