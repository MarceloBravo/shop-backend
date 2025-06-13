import validaDatos from './validaDatos.js';

/**
 * Servicio para crear nuevos registros de peso de producto
 * @class CreatePesoProductoService
 */
class CreatePesoProductoService {
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
     * Ejecuta la creación de un nuevo registro de peso para un producto
     * @param {Object} data - Datos del peso del producto a crear:
     *      @param {number} data.peso - El peso del producto
     *      @param {number} data.id_producto - ID del producto asociado
     *      @param {number} [data.id_unidad_medida] - ID de la unidad de medida del peso
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Nuevo registro de peso creado
     * @throws {Error} Si la validación falla o hay un error en la creación
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreatePesoProductoService;