import ColorProductoRepository from '../../repositories/ColorProductoRepository.js';


class GetPageColorProductoService{
    constructor(repository = new ColorProductoRepository()) {
        this.repository = repository;
    }

    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        return await this.repository.getPage(desde, limit, paranoid);
    }           
}

export default GetPageColorProductoService;