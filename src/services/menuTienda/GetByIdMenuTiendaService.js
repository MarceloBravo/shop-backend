/**
 * Clase para obtener un menú de la tienda a partir de su ID.
 * @class GetByIdMenuTiendaService
 */
class GetByIdMenuTiendaService{
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
     * Obtiene un menú de la tienda por su ID.
     * @param {number} id - ID del menú a obtener.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo los menús de la tienda no eliminados.
     * @returns {Promise<Object>} - El menú de la tienda encontrado.
     * */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            const error = new Error('Regístro no encontrado');
            error.code = 404;
            throw error;
        }   
        return await this.repository.getById(id, paranoid);
    }
}


export default GetByIdMenuTiendaService;