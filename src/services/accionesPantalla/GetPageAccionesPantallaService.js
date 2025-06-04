/**
 * Servicio para obtener una página de acciones de pantalla
 * @class GetPageAccionesPantallaService
 */
class GetPageAccionesPantallaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de acciones de pantalla
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una página de acciones de pantalla
     * @param {number} [pag=1] - Número de página a obtener
     * @param {number} [limit=process.env.DEFAULT_REG_POR_PAGINA] - Número máximo de acciones por página
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las acciones no eliminadas
     * @returns {Promise<Object>} Resultado de la paginación
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
}

export default GetPageAccionesPantallaService;