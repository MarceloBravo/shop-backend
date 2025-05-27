import UsuarioRepository from "../../repositories/UsuarioRepository.js";
import { validaDatos } from "./validaDatos.js";

/**
 * Servicio para crear un nuevo tipo de dimensión (tipo de medida)
 * @class
 * @constructor
 * @description Esta clase se encarga de crear un nuev tipo de dimensión (tipo de medida) en la base de datos.
 * */
class CreateUsuarioService {
    /**
     * @param {UsuarioRepository} repository - El repositorio para interactuar con la base de datos o un Mock.
     */
    constructor(repository = new UsuarioRepository()) {
        this.repository = repository;
    }

    /**
     * Crea un nuevo usuario.
     * @param {Object} data - Los datos del usuario a crear.
     * @param {Object|null} [transaction=null] - El objeto de transacción para operaciones en la base de datos.
     * @returns {Promise<Object>} - El usuario creado.
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateUsuarioService;