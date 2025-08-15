import { validaDatos } from "./validaDatos.js";

/**
 * Servicio para crear un nuevo usuario.
 * @class CreateUsuarioService
 */
class CreateUsuarioService {
    /**
     * @param repository - El repositorio para interactuar con la base de datos o un Mock.
     * @throws {Error} Si el repositorio no es proporcionado.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error("Se requiere un repositorio para CreateUsuarioService.");
        }
        this.repository = repository;
    }

    /**
     * Crea un nuevo usuario.
     * @param {Object} data - Los datos del usuario a crear.
     * @returns {Promise<Object>} - El usuario creado.
     */
    execute = async (data) => {
        validaDatos(data);
        const existe = await this.repository.getBy('rut', data.rut);
        if (existe) {
            const error = new Error("El usuario ya está exíste.");
            error.status = 400;
            throw error;
        }
        return await this.repository.create(data);
    }
}

export default CreateUsuarioService;