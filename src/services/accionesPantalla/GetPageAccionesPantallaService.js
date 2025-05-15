import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetPageAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }


    getPage = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
}

export default GetPageAccionesPantallaService;