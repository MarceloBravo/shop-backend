// filepath: c:\Proyectos\mi-cv\backend-cv\src\services\RolPermisos\GetByIdRolPermisosService.js
import RolPermisosRepository from "../../repositories/RolPermisosRepository.js";

/**
 * Servicio para obtener un permiso de rol por su ID
 * @class
 * @constructor
 * @param {RolPermisosRepository} repository - Repositorio de permisos de roles
 * @description Esta clase se encarga de obtener un permiso de rol específico por su ID
 */
class GetByIdRolPermisosService {
    constructor(repository = new RolPermisosRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene un permiso de rol por su ID
     * @param {number} id - ID del permiso de rol a buscar
     * @param {boolean} [paranoid=true] - Si es true, solo busca registros no eliminados
     * @returns {Promise<Object>} El permiso de rol encontrado
     */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdRolPermisosService;