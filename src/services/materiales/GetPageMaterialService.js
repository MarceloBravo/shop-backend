/**
 * Servicio para obtener una página de materiales
 * @class GetPageMaterialService
 */
class GetPageMaterialService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }
    
    /**
     * Ejecuta la obtención de una página de materiales
     * @param {number} [pag=1] - Número de página a obtener
     * @param {number} [limit=process.env.DEFAULT_REG_POR_PAGINA] - Cantidad de registros por página
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los registros eliminados lógicamente
     * @returns {Promise<Object>} Página de materiales
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
}

export default GetPageMaterialService;