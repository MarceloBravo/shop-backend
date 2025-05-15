import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetAllAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    getAll = async () => {
        return await this.repository.getAll();
    }
}

export default GetAllAccionesPantallaService;