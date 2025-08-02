import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo registro de género
 * @class CreateGeneroService
 */
class CreateGeneroService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de géneros
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de un nuevo registro de género
     * @param {Object} data - Datos del género a crear
     * @param {string} data.nombre - Nombre del género
     * @param {string} data.descripcion - Descripción del género
     * @returns {Promise<Object>} Género creado
     * @throws {Error} Si los datos no son válidos o si ya existe un género con el mismo nombre
     */
    execute = async (data) => {
        validaDatos(data);
        const existe = await this.repository.getBy('genero', data.genero);
        if (existe) {
            throw new Error('El género ya existe');
        }
        return await this.repository.create(data);
    }
}

export default CreateGeneroService;