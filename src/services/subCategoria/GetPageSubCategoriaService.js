/**
 * Servicio para obtener una página de subcategorías
 * @class GetPageSubCategoriaService
 */
class GetPageSubCategoriaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de subcategorías
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una página de subcategorías
     * @param {number} page - Número de página
     * @param {number} [limit=10] - Límite de registros por página
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las subcategorías eliminadas
     * @returns {Promise<Object>} Objeto con los registros, total de registros y total de páginas
     */
    execute = async (page, limit = 10, paranoid = true) => {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.repository.getPage(offset, limit, [['nombre', 'ASC']], paranoid);
        const totPag = Math.ceil(count / limit);
        return { rows, count, totPag };
    }
}

export default GetPageSubCategoriaService;