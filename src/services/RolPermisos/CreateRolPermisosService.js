import validaDatos from './ValidaDatos.js';

/**
 * Servicio para crear un nuevo permiso de rol
 * @class CreateRolPermisosService
 */
class CreateRolPermisosService {
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
     * Ejecuta la creación de un nuevo permiso de rol
     * @param {Object} data - Datos del permiso de rol
     * @param {number} data.rol_id - ID del rol
     * @param {number} data.acciones_pantalla_id - ID de las acciones de pantalla
     * @param {boolean} data.crear - Permiso para crear
     * @param {boolean} data.actualizar - Permiso para actualizar
     * @param {boolean} data.eliminar - Permiso para eliminar
     * @param {boolean} data.listar - Permiso para listar
     * @param {boolean} data.ver - Permiso para ver
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Permiso de rol creado
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        const existe = await this.repository.getBy({'rol_id': data.rol_id, 'acciones_pantalla_id': data.acciones_pantalla_id});
        if (existe) {
            const error = new Error('El permiso de rol ya existe');
            error.code = 400; // Conflict
            throw error;
        }   
        return await this.repository.create(data, transaction);
    }
}

export default CreateRolPermisosService;