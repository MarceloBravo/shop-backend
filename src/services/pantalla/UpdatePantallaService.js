import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una pantalla
 * @class UpdatePantallaService
 */
class UpdatePantallaService {
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
     * Ejecuta la actualización de una pantalla
     * @param {string|number} id - ID de la pantalla a actualizar
     * @param {Object} data - Datos de la pantalla a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Pantalla actualizada
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Pantalla no encontrada');
        }
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdatePantallaService;