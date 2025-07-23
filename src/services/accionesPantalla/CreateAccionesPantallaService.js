import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva acción de pantalla
 * @class CreateAccionesPantallaService
 */
class CreateAccionesPantallaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de acciones de pantalla
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva acción de pantalla
     * @param {Object} data - Datos de la acción de pantalla a crear
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la creación
     * @returns {Promise<Object>} Acción de pantalla creada
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateAccionesPantallaService;