import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo tipo de dimensión
 * @class CreateTipoDimensionesService
 */
class CreateTipoDimensionesService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tipos de dimensión
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Crea un nuevo tipo de dimensiones
     * @param {Object} data - Datos del tipo de dimensiones
     * @param {string} data.nombre_corto - Nombre corto del tipo de dimensiones
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} El tipo de dimensiones creado
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        const existe = await this.repository.getBy('nombre', data.nombre);
        if (existe) {
            throw new Error('Ya existe un tipo de dimensión con ese nombre');
        }
        return await this.repository.create(data, transaction);
    }
}

export default CreateTipoDimensionesService;