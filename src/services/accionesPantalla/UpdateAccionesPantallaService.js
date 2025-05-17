import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';
import validaDatos from './validaDatos.js';

class UpdateAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }
    
    execute = async (id, data, transaction = null) => {
        validaDatos(data, true);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateAccionesPantallaService;