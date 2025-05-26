import RolPermisosRepository from "../../repositories/RolPermisosRepository.js";

/**
 * Servicio para obtener todos los permisos de roles.
 * @class
 * @constructor
 * @param {RolPermisosRepository} repository - Repositorio de permisos de roles.
 * @description Esta clase se encarga de obtener todos los permisos de roles del sistema.
 */
class GetAllRolPermisosService {
    constructor(repository = new RolPermisosRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene todos los permisos de roles.
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados.
     * @returns {Promise<Object>} Objeto con la lista de permisos y el total.
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllRolPermisosService;