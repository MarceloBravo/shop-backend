import DimensionesProductoRepository from '../../repositories/DimensionesProductoRepository.js';


class GetPageDimensionesProductoService {
    constructor(repository = new DimensionesProductoRepository()) {
        this.repository = repository;
    }
    /**
     * Obtiene una página de registros de dimensiones de producto
     * @param {number} pag - Número de página
     * @param {number} limit - Número máximo de registros por página
     * @returns {Promise<Object>} - La página de registros de dimensiones de producto
     */

    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
        const desde = (pag - 1) * limit;
        return await this.repository.getPage(desde, limit);
    }
}

export default GetPageDimensionesProductoService;