import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un menú de la tienda existente.
 * @class UpdateMenuTiendaService
 */
class UpdateMenuTiendaService{
     /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús asociados a la tienda
     * @throws {Error} Si el repositorio no es proporcionado
     */
     constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Actualiza un menú de la tienda en la base de datos.
     * @param {number} id - ID del menú de la tienda a actualizar.
     * @param {Object} data - Datos del menú a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El menú de la tienda actualizado.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data, id);
        return await this.repository.update(id, data, transaction);
    }

}

export default UpdateMenuTiendaService;