/**
 * Servicio para eliminar permanentemente un usuario.
 * @class HardDeleteUsuarioService
 */
class HardDeleteUsuarioService {
    /**
     * @param repository - El repositorio para interactuar con la base de datos o un Mock.
     * @throws {Error} Si el repositorio no es proporcionado.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error("Se requiere un repositorio para HardDeleteUsuarioService.");
        }
        this.repository = repository;
    }

    /**
     * Realiza un borrado físico de un usuario.
     * @param {number} id - El ID del usuario a borrar físicamente.
     * @param {Object|null} [transaction=null] - El objeto de transacción para operaciones en la base de datos.
     * @returns {Promise<void>} - Indica que la operación se completó.
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            const error = new Error("El usuario no existe.");
            error.code = 404;
            throw error;
        }   
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteUsuarioService;