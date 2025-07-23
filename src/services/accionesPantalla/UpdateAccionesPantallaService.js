import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una acción de pantalla
 * @class UpdateAccionesPantallaService
 */
class UpdateAccionesPantallaService {
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
     * Ejecuta la actualización de una acción de pantalla
     * @param {number} id - ID de la acción de pantalla a actualizar
     * @param {Object} data - Datos a actualizar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la actualización
     * @returns {Promise<Object>} Acción de pantalla actualizada
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateAccionesPantallaService;