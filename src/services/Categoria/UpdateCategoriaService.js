import validaDatos from "./validaDatos.js";

/**
 * Servicio para actualizar o crear una categoría
 * @class UpdateCategoriaService
 */
class UpdateCategoriaService {
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
     * Ejecuta la actualización o creación de una categoría
     * @param {string|number} id - ID de la categoría a actualizar
     * @param {Object} data - Datos de la categoría a actualizar
     * @returns {Promise<Object>} Objeto con la categoría actualizada y un indicador de si fue creada
     */
    execute = async (id, data) => {
        validaDatos(data);
        const exists = await this.repository.getById(id);
        if (!exists) {
            const color = await this.repository.create(data);
            return { color, created: true };
        }
        const color = await this.repository.update(id, data);
        return { color, created: false };
    }
}

export default UpdateCategoriaService;