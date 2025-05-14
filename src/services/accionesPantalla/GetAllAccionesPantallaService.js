import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetAllAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    getAllAccionesPantallaService = async () => {
        return await this.repository.getAllAccionesPantalla();
    }
}

export default GetAllAccionesPantallaService;