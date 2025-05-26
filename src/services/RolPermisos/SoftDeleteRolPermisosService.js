import RolPermisosRepository from "../../repositories/RolPermisosRepository.js";

/**
 * Servicio para realizar el borrado lógico de permisos de roles
 * @class
 * @constructor
 * @param {RolPermisosRepository} repository - Repositorio de permisos de roles
 * @description Esta clase se encarga de realizar el borrado lógico de permisos de roles en el sistema
 */
class SoftDeleteRolPermisosService {
    constructor(repository = new RolPermisosRepository()) {
        this.repository = repository;
    }

    /**
     * Realiza el borrado lógico de un permiso de rol
     * @param {number} id - ID del permiso de rol a eliminar
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} Resultado de la operación: true si fue exitoso, false si falló
     */
    execute = async (id, transaction = null) => {
        const {result} = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteRolPermisosService;