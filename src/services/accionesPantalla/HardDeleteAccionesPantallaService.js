import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';


class HardDeleteAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    hardDelete = async ({id}) => {
        return await this.repository.hardDelete(id);
    }
}

export default HardDeleteAccionesPantallaService;
;