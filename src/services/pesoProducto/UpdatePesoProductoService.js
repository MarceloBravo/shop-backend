import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar los datos de peso de un producto
 * @class UpdatePesoProductoService
 */
class UpdatePesoProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de pesos de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de un registro de peso
     * @param {string|number} id - ID del registro de peso a actualizar
     * @param {Object} data - Datos del peso del producto a actualizar:
     *      @param {number} data.peso - El peso del producto
     *      @param {number} data.id_producto - ID del producto asociado
     *      @param {number} [data.id_unidad_medida] - ID de la unidad de medida del peso
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Registro de peso actualizado
     * @throws {Error} Si la validación falla o hay un error en la actualización
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Registro de peso no encontrado');
        }
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdatePesoProductoService;