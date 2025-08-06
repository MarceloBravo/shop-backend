import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo menú
 * @class CreateMenuService
 */
class CreateMenuService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de un nuevo menú
     * @param {Object} data - Datos del menú a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Menú creado
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        const existe = await this.repository.getBy('nombre', data.nombre);
        if(existe){
            const error = new Error('El menú ya existe');
            error.code = 400;
            throw error;
        }
        return await this.repository.create(data, transaction);
    }
}

export default CreateMenuService;