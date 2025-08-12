import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una talla numérica
 * @class UpdateTallaNumeroService
 */
class UpdateTallaNumeroService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas numéricas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de una talla numérica
     * @param {string|number} id - ID de la talla numérica a actualizar
     * @param {Object} data - Datos de la talla numérica a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Talla numérica actualizada
     * @throws {Error} Si la talla numérica no es encontrada
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const existe = await this.repository.getBy('valor', data.valor);
        if (existe && existe.id !== id) {
            const error = new Error('Talla numérica ya existe');
            error.code = 409;
            throw error;
        }
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateTallaNumeroService;