import validaDatos from "./validaDatos.js";

/**
 * Servicio para crear una nueva categoría
 * @class CreateCategoriaService
 */
class CreateCategoriaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de categorías
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva categoría
     * @param {Object} data - Datos de la categoría a crear
     * @returns {Promise<Object>} Categoría creada
     */
    execute = async (data) => {
        validaDatos(data);
        const existe = await this.repository.getBy('nombre', data.nombre);
        if (existe) {
            throw new Error('Ya existe una categoría con ese nombre');
        }
        return await this.repository.create(data);
    }
}

export default CreateCategoriaService;