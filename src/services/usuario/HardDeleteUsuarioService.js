import UsuarioRepository from "../../repositories/UsuarioRepository.js";

 /**
 * Servicio para eliminar permanentemente un usuario
 * @class
 * @constructor
 * @description Esta clase se encarga de eliminar permanentemente un usuario de la base de datos.
 * */
class HardDeleteUsuarioService {
    /**
     * @param {UsuarioRepository} repository - El repositorio para interactuar con la base de datos o un Mock.
     */
    constructor(repository = new UsuarioRepository()) {
        this.repository = repository;
    }

    /**
     * Realiza un borrado físico de un usuario.
     * @param {number} id - El ID del usuario a borrar físicamente.
     * @param {Object|null} [transaction=null] - El objeto de transacción para operaciones en la base de datos.
     * @returns {Promise<void>} - Se resuelve cuando el usuario es borrado físicamente.
     */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteUsuarioService;