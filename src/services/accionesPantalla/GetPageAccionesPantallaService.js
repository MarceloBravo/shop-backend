import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetPageAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }


    getPageAccionesPantallaService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPageAccionesPantalla(desde, limit);
        return result;
    }
}

export default GetPageAccionesPantallaService;