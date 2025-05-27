import UsuarioRepository from "../../repositories/UsuarioRepository.js";

/**
 * Servicio encargado de marcar con soft-delete un regístro
 * @class SoftDeleteUsuarioService
 * @constructor
 * @description - Clase encargada de marcar un regístro de usuarios como eliminado, con soft-delete.
 */
class SoftDeleteUsuarioService {
    /**
     * @param {UsuarioRepository} repository - El repositorio para interactuar con la base de datos o un Mock.
     */
    constructor(repository = new UsuarioRepository()) {
        this.repository = repository;
    }

    /**
     * Se encarga de marcar un regístro como eliminado.
     * @param {number} [id] - ID del regístro a eliminar con borrado suave 
     * @param {object} transaction - Objeto que puede contiene la transacción en la cual se borrará el regístro
     * @returns {Promise<Object>} - Resultado de la operación.
     */
    async execute(id, transaction = null) {
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteUsuarioService;