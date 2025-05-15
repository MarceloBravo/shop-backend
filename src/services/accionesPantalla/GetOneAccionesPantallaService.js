import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetOneAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    getOne = async (id) => {
        return await this.repository.getOne(id);
    }
}

export default GetOneAccionesPantallaService;