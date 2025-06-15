import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { validaDatos } from "./validaDatos.js";

/**
 * Servicio para actualizar un usuario.
 * @class UpdateUsuarioService
 */
class UpdateUsuarioService {
    /**
     * @param repository - El repositorio para interactuar con la base de datos o un Mock.
     * @throws {Error} Si el repositorio no es proporcionado.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error("Se requiere un repositorio para UpdateUsuarioService.");
        }
        this.repository = repository;
    }

    /**
     * Actualiza un usuario existente.
     * @param {number} id - El ID del usuario a actualizar.
     * @param {Object} data - Los nuevos datos para el usuario.
     * @param {Object|null} [transaction=null] - El objeto de transacción para operaciones en la base de datos.
     * @returns {Promise<Object>} - El usuario actualizado.
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateUsuarioService;