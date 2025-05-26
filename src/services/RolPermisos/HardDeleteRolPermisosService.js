import RolPermisosRepository from "../../repositories/RolPermisosRepository.js"; 

/**
 * Servicio para realizar el borrado físico de permisos de roles
 * @class
 * @constructor
 * @param {RolPermisosRepository} repository - Repositorio de permisos de roles
 * @description Esta clase se encarga de realizar el borrado físico (permanente) de permisos de roles en el sistema
 */
class HardDeleteRolPermisosService {
    constructor(repository = new RolPermisosRepository()) {
        this.repository = repository;
    }

    /**
     * Realiza el borrado físico de un permiso de rol
     * @param {number} id - ID del permiso de rol a eliminar permanentemente
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} Objeto con el id y el resultado de la operación
     */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteRolPermisosService;