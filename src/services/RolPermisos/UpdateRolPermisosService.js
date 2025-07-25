import validaDatos from './ValidaDatos.js';

/**
 * Servicio para actualizar un permiso de rol
 * @class UpdateRolPermisosService
 */
class UpdateRolPermisosService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de permisos de roles
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de un permiso de rol
     * @param {string|number} id - ID del permiso de rol a actualizar
     * @param {Object} data - Datos del permiso de rol
     * @param {number} data.rol_id - ID del rol
     * @param {number} data.acciones_pantalla_id - ID de las acciones de pantalla
     * @param {boolean} data.crear - Permiso para crear
     * @param {boolean} data.actualizar - Permiso para actualizar
     * @param {boolean} data.eliminar - Permiso para eliminar
     * @param {boolean} data.listar - Permiso para listar
     * @param {boolean} data.ver - Permiso para ver
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Permiso de rol actualizado
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateRolPermisosService;