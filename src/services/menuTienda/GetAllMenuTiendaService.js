/**
 * Clase para obtener todos los menús de la tienda.
 * @class GetAllMenuTiendaService
 */
class GetAllMenuTiendaService{
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
     * Obtiene todos los menús de la tienda de la base de datos.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo los menús de la tienda no eliminados.
     * @returns {Promise<Array>} - Lista de menús de la tienda.
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}


export default GetAllMenuTiendaService;