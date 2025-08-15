/**
 * Servicio para obtener una lista paginada de usuarios.
 * @class GetPageUsuarioService
 */
class GetPageUsuarioService {
    /**
     * @param repository - El repositorio para interactuar con la base de datos o un Mock.
     * @throws {Error} Si el repositorio no es proporcionado.
     */
    constructor(repository) {
        if (!repository) {
            throw new Error("Se requiere un repositorio para GetPageUsuarioService.");
        }
        this.repository = repository;
    }

    /**
     * Obtiene una lista paginada de usuarios.
     * @param {number} [page=1] - El número de página a obtener.
     * @param {number} [limit=process.env.DEFAULT_REG_POR_PAGINA] - El número de registros por página.
     * @param {boolean} [paranoid=true] - Si incluir registros eliminados lógicamente.
     * @returns {Promise<Object>} - El resultado paginado.
     */
    execute = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true, orderBy = [['nombres', 'ASC']]) => {
        const desde = (page - 1) * limit;
        const { rows, count } = await this.repository.getPage(desde, limit, paranoid, orderBy);
        const totPag = Math.ceil(count / limit);
        return { rows, count, totPag };
    }
}

export default GetPageUsuarioService;