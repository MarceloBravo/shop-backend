/**
 * Servicio para obtener un permiso de rol por su ID
 * @class GetByIdRolPermisosService
 */
class GetByIdRolPermisosService {
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
     * Ejecuta la obtención de un permiso de rol por su ID
     * @param {string|number} id - ID del permiso de rol a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el permiso si está eliminado
     * @returns {Promise<Object>} Permiso de rol encontrado
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Permisos no encontrados');
        }
        return result;
    }
}

export default GetByIdRolPermisosService;