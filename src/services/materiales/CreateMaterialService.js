import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo material
 * @class CreateMaterialService
 */
class CreateMaterialService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de un nuevo material
     * @param {Object} data - Datos del material a crear
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la creación
     * @returns {Promise<Object>} Material creado
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        const existe = await this.repository.getBy('valor', data.valor);
        if (existe) {
            throw new Error('Ya existe un material con ese valor');
        }
        return await this.repository.create(data, transaction);
    }
}

export default CreateMaterialService;