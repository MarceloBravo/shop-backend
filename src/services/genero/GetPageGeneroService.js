import GeneroRepository from '../../repositories/GeneroRepository.js';

class GetPageGeneroService{
    constructor(repository = new GeneroRepository()) {
        this.repository = repository;
    }

    /**
     * @param {number} pag - Número de página
     * @param {number} limit - Número de registros por página
     * @returns {Promise<{data: *, count: number}>} - Promesa que se resuelve con los generos encontrados
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
}

export default GetPageGeneroService;