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
        const data = await this.repository.getById(id, paranoid);
        if (!data) {
            const error = new Error("El usuario no existe.");
            error.status = 404;
            throw error;
        }
        return data;
    }
}

export default GetByIdUsuarioService;