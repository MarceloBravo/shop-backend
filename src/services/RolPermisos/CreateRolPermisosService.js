import RolPermisosRepository from "../../repositories/RolPermisosRepository.js";
import validaDatos from './ValidaDatos.js';

/**
 * Servicio para crear un nuevo permiso de rol
 * @class
 * @constructor
 * @param {RolPermisosRepository} repository - Repositorio de permisos de roles
 * @description Esta clase se encarga de crear nuevos permisos de roles en el sistema
 */
class CreateRolPermisosService {
    constructor(repository = new RolPermisosRepository()) {
        this.repository = repository;
    }

    /**
     * Crea un nuevo permiso de rol
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
     * @returns {Promise<Object>} El permiso de rol creado
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateRolPermisosService;