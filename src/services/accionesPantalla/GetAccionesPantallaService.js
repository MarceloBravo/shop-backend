import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    getAccionesPantallaService = async (id) => {
        return await this.repository.getAccionesPantalla(id);
    }
}

export default GetAccionesPantallaService;