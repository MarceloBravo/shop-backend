import UsuarioRepository from "../../repositories/UsuarioRepository.js";

 /**
 * Servicio para obtener un tipo de dimensión por su ID.
 * @class
 * @constructor
 * @description Esta clase se encarga de obtener un tipo de dimensión específico de la base de datos.
 * */
class GetByIdUsuarioService {
    /**
     * @param {UsuarioRepository} repository - El repositorio para interactuar con la base de datos o un Mock.
     */
    constructor(repository = new UsuarioRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene un usuario por ID.
     * @param {number} id - El ID del usuario a obtener.
     * @param {boolean} [paranoid=true] - Si incluir registros eliminados lógicamente.
     * @returns {Promise<Object>} - El registro del usuario.
     */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdUsuarioService;