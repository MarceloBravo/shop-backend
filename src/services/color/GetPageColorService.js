import ColorRepository from '../../repositories/ColorRepository.js';

class GetPageColorService {
    constructor(repository = new ColorRepository()) {
        this.repository = repository;
    }

    getPage = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        return await this.repository.getPage(desde, limit, paranoid);
    }
}   

export default GetPageColorService;