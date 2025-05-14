import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';
import validaDatos from './validaDatos.js';

class UpdateAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }
    
    updateAccionesPantallaService = async (id, data, transaction = null) => {
        validaDatos(data, true);
        const result = await this.repository.updateAccionesPantalla(id, data, transaction);
        return result;
    }
}

export default UpdateAccionesPantallaService;