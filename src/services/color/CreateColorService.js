import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo color
 * @class CreateColorService
 */
class CreateColorService {
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
     * Ejecuta la creación de un nuevo color
     * @param {Object} data - Datos del color a crear
     * @returns {Promise<Object>} Color creado
     */
    execute = async (data) => {
        validaDatos(data);
        const existe = await this.repository.getBy('nombre', data.nombre);
        if (existe) {
            throw new Error('Ya existe un color con ese nombre');
        }
        return await this.repository.create(data);
    }   
}

export default CreateColorService;