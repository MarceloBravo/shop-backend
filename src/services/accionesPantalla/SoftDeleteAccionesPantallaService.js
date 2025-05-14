import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class SoftDeleteAccionesPantallaService{
    
    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }


    softDeleteAccionesPantallaService = async (id) => {
        const record = await this.repository.softDeleteAccionesPantalla(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }
}

export default SoftDeleteAccionesPantallaService;