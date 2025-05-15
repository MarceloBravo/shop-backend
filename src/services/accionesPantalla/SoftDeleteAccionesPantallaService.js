import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';

class SoftDeleteAccionesPantallaService{
    
    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }


    softDelete = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }
}

export default SoftDeleteAccionesPantallaService;