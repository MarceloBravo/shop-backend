import RolPermisosRepository from "../../repositories/RolPermisosRepository.js";

/**
 * Servicio para obtener una página de permisos de roles
 * @class
 * @constructor
 * @param {RolPermisosRepository} repository - Repositorio de permisos de roles
 * @description Esta clase se encarga de obtener una página de permisos de roles del sistema
 */
class GetPageRolPermisosService {
    constructor(repository = new RolPermisosRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una página de permisos de roles
     * @param {number} [page=1] - Número de página
     * @param {number} [pageSize=process.env.DEFAULT_REG_POR_PAGINA] - Cantidad de registros por página
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados
     * @returns {Promise<Object>} Objeto con la lista de permisos paginada y metadata
     */
    execute = async (page = 1, pageSize = Number(process.env.DEFAULT_REG_POR_PAGINA), paranoid = true) => {
        const desde = (page - 1) * pageSize;
        return await this.repository.getPage(desde, pageSize, paranoid);
    }
}

export default GetPageRolPermisosService;