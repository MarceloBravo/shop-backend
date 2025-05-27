import UsuarioRepository from "../../repositories/UsuarioRepository.js";

/**
 *Servicio para obtener todos los usuarios de la base de datos
 * @class GetAllUsuarioService
 * @constructor
 * @param {UsuarioRepository} repository - Repositorio de usuarios.
 * @description Esta clase se encarga de obtener todos los usuarios de la base de datos.
 */
class GetAllUsuarioService {
    constructor(repository = new UsuarioRepository()) {
        this.repository = repository;
    }

    
    /**
     * Obtiene todos los usuarios de la base de datos.
     * @params {boolean} [paranoid=true] - Si es true, se obtienen solo los usuarios no eliminados.
     * @returns {Promise<Array>} - Lista de usuarios.
     * */
    execute = async (paranoid = true, orderBy = [['nombres', 'ASC']]) =>  {
        return await this.repository.getAll(paranoid, orderBy);
    }
}

export default GetAllUsuarioService;