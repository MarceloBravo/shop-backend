import UsuarioRepository from "../../repositories/UsuarioRepository.js";

/**
 * Servicio para obtener una página se tipo de dimensión.
 * @class GetPageTipoDimensionesService
 * @constructor
 * @description Esta clase se encarga de obtener una página de tipo de dimensiones de la base de datos.
 * */
class GetPageUsuarioService {
    /**
     * @param {UsuarioRepository} repository - El repositorio para interactuar con la base de datos o un Mock.
     */
    constructor(repository = new UsuarioRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una lista paginada de usuarios.
     * @param {number} [page=1] - El número de página a obtener.
     * @param {number} [limit=process.env.DEFAULT_REG_POR_PAGINA] - El número de registros por página.
     * @param {boolean} [paranoid=true] - Si incluir registros eliminados lógicamente.
     * @returns {Promise<Object>} - El resultado paginado.
     */
    async execute(page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true, orderBy = [['nombres', 'ASC']]) {
        const desde = (page - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid, orderBy);
        return result;
    }
}

export default GetPageUsuarioService;