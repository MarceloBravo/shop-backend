import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';


class DeleteAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    deleteAccionesPantallaService = async ({id}) => {
        return await this.repository.deleteAccionesPantalla(id);
    }
}

export default DeleteAccionesPantallaService;