import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar o crear un color
 * @class UpdateColorService
 */
class UpdateColorService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }       
    
    /**
     * Ejecuta la actualización o creación de un color
     * @param {string|number} id - ID del color a actualizar
     * @param {Object} data - Datos del color a actualizar
     * @returns {Promise<Object>} Objeto con el color actualizado y un indicador de si fue creado
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

export default UpdateColorService;