import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un registro de género existente
 * @class UpdateGeneroService
 */
class UpdateGeneroService {
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
     * Ejecuta la actualización de un registro de género
     * @param {string|number} id - ID del género a actualizar
     * @param {Object} values - Datos del género a actualizar
     * @param {string} values.nombre - Nombre del género
     * @param {string} values.descripcion - Descripción del género
     * @returns {Promise<Object>} Género actualizado
     * @throws {Error} Si los datos no son válidos, si el género no existe o si ya existe otro género con el mismo nombre
     */
    execute = async (id, values) => {
        validaDatos(values);
        const { data, created } = await this.repository.update(id, values);
        return { data, created };
    }
}

export default UpdateGeneroService;