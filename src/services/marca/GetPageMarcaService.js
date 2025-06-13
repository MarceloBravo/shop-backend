/**
 * Servicio para obtener una página de marcas
 * @class GetPageMarcaService
 */
class GetPageMarcaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de marcas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una página de marcas
     * @param {number} [pag=1] - Número de página a obtener
     * @param {number} [limit=process.env.DEFAULT_REG_POR_PAGINA] - Número máximo de marcas por página
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas
     * @returns {Promise<Array>} Lista de marcas de la página solicitada
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        return await this.repository.getPage(desde, limit, paranoid);
    }
}

export default GetPageMarcaService;