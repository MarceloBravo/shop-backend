import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetOneAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    getById = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetOneAccionesPantallaService;