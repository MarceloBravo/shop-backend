/**
 * Clase para obtener una página de registros de la base de datos
 * @class GetPageMenuService
 */
class GetPageMenuTiendaService{
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
     * Obtiene una página de menús de la tienda.
     * @param {number} desde - El índice de inicio de la página.
     * @param {number} limit - El número máximo de menús de la tienda por página.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo los menús de la tienda no eliminados.
     * @returns {Promise<Object>} - Un objeto que contiene la lista de menús de la tienda y el total de menús.
     * @description Esta función obtiene una página de menús de la tienda de la base de datos.
     * */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const { rows, count } = await this.repository.getPage(desde, limit, paranoid);
        const totPag = Math.ceil(count / limit);
        return { rows, count, totPag };
    }

}


export default GetPageMenuTiendaService;