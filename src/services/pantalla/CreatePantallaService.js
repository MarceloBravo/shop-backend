import validaDatos from './validaDatos.js';


/**
 * Servicio para crear una nueva pantalla
 * @class CreatePantallaService
 */
class CreatePantallaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de pantallas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva pantalla
     * @param {Object} data - Datos de la pantalla a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Pantalla creada
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        const existe = await this.repository.getBy('nombre', data.nombre, false);
        if (existe) {
            const error = new Error(`Ya existe una pantalla con el nombre: ${data.nombre}`);
            error.code = 400;
            throw error;
        }   
        return await this.repository.create(data, transaction);
    }
}

export default CreatePantallaService;