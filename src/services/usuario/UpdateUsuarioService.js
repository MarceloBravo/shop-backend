import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { validaDatos } from "./validaDatos.js";

/**
 * Servicio para actualizar un usuarios
 * @class UpdateUsuarioService
 * @constructor
 * @description Esta clase se encarga de eliminar permanentemente un usuario de la base de datos.
 * */
class UpdateUsuarioService {
    /**
     * @param {UsuarioRepository} repository - El repositorio para interactuar con la base de datos o un Mock.
     */
    constructor(repository = new UsuarioRepository()) {
        this.repository = repository;
    }

    /**
     * Actualiza un usuario existente.
     * @param {number} id - El ID del usuario a actualizar.
     * @param {Object} data - Los nuevos datos para el usuario.
     * @param {Object|null} [transaction=null] - El objeto de transacción para operaciones en la base de datos.
     * @returns {Promise<Object>} - El usuario actualizado.
     */
    async execute(id, data, transaction = null) {
        validaDatos(data);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateUsuarioService;