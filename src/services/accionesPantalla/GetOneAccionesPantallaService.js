import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class GetOneAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    getOne = async (id, paranoid = true) => {
        return await this.repository.getOne(id, paranoid);
    }
}

export default GetOneAccionesPantallaService;