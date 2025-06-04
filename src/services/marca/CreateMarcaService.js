import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva marca
 * @class CreateMarcaService
 */
class CreateMarcaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de marcas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva marca
     * @param {Object} data - Datos de la marca a crear
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la creación
     * @returns {Promise<Object>} Marca creada
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        const existe = await this.repository.getBy('nombre', data.nombre);
        if (existe) {
            throw new Error('Ya existe una marca con ese nombre');
        }
        return await this.repository.create(data, transaction);
    }
}

export default CreateMarcaService;