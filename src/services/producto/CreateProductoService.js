import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo producto
 * @class CreateProductoService
 */
class CreateProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de un nuevo producto
     * @param {Object} data - Datos del producto a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Producto creado
     * @throws {Error} Si la validación falla o hay un error en la creación
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateProductoService;