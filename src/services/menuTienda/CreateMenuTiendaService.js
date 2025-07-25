import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo menú
 * @class CreateMenuService
 */
class CreateMenuTiendaService{
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús asociados a la  Tienda
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Crea un nuevo menú de la tienda en la base de datos.
     * @param {Object} data - Datos del menú a crear.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El menú  de la tienda creado.
     * */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateMenuTiendaService;