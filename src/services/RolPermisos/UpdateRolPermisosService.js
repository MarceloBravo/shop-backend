import RolPermisosRepository from "../../repositories/RolPermisosRepository.js";
import validaDatos from './ValidaDatos.js';

/**
 * Servicio para actualizar un permiso de rol
 * @class
 * @constructor
 * @param {RolPermisosRepository} repository - Repositorio de permisos de roles
 * @description Esta clase se encarga de actualizar permisos de roles existentes en el sistema
 */
class UpdateRolPermisosService {
    constructor(repository = new RolPermisosRepository()) {
        this.repository = repository;
    }

    /**
     * Actualiza un permiso de rol
     * @param {number} id - ID del permiso de rol a actualizar
     * @param {Object} data - Datos del permiso de rol:
     * {
     *      @param {number} data.rol_id - ID del rol
     *      @param {number} data.acciones_pantalla_id - ID de las acciones de pantalla
     *      @param {boolean} data.crear - Permiso para crear
     *      @param {boolean} data.actualizar - Permiso para actualizar
     *      @param {boolean} data.eliminar - Permiso para eliminar
     *      @param {boolean} data.listar - Permiso para listar
     *      @param {boolean} data.ver - Permiso para ver
     * }
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} El permiso de rol actualizado
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateRolPermisosService;