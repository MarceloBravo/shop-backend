import validaDatos from './ValidaDatos.js';

/**
 * Servicio para crear una nueva valoración de producto
 * @class CreateValoracionProductoService
 */
class CreateValoracionProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de valoraciones de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la creación de una nueva valoración de producto
     * @param {Object} data - Datos de la valoración a crear
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Valoración creada
     */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateValoracionProductoService;