import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetAllAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllAccionesPantallaService;