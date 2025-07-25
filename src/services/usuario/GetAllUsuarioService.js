/**
 * Servicio para obtener todos los usuarios de la base de datos.
 * @class GetAllUsuarioService
 */
class GetAllUsuarioService {
    /**
     * @param repository - El repositorio para interactuar con la base de datos o un Mock.
     * @throws {Error} Si el repositorio no es proporcionado.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error("Se requiere un repositorio para GetAllUsuarioService.");
        }
        this.repository = repository;
    }

    
    /**
     * Obtiene todos los usuarios de la base de datos.
     * @params {boolean} [paranoid=true] - Si es true, se obtienen solo los usuarios no eliminados.
     * @returns {Promise<Array>} - Lista de usuarios.
     * */
    execute = async (paranoid = true, orderBy = [['nombres', 'ASC']]) =>  {
        return await this.repository.getAll(paranoid, orderBy);
    }
}

export default GetAllUsuarioService;