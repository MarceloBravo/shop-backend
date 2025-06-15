/**
 * Servicio para obtener un usuario por su ID.
 * @class GetByIdUsuarioService
 */
class GetByIdUsuarioService {
    /**
     * @param repository - El repositorio para interactuar con la base de datos o un Mock.
     * @throws {Error} Si el repositorio no es proporcionado.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error("Se requiere un repositorio para GetByIdUsuarioService.");
        }
        this.repository = repository;
    }

    /**
     * Obtiene un usuario por ID.
     * @param {number} id - El ID del usuario a obtener.
     * @param {boolean} [paranoid=true] - Si incluir registros eliminados lógicamente.
     * @returns {Promise<Object>} - El usuario obtenido.
     */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdUsuarioService;