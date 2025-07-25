import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una marca
 * @class UpdateMarcaService
 */
class UpdateMarcaService {
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
     * Ejecuta la actualización de una marca
     * @param {number} id - ID de la marca a actualizar
     * @param {Object} data - Datos a actualizar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la actualización
     * @returns {Promise<Object>} Marca actualizada
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const existe = await this.repository.getBy('nombre', data.nombre);
        if (existe && existe.id !== id) {
            throw new Error('Ya existe una marca con ese nombre');
        }
        const record = await this.repository.update(id, data, transaction);
        return record;
    }
}

export default UpdateMarcaService;