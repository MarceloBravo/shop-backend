import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';
import validaDatos from './validaDatos.js';

class CreateAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    create = async (data, transaccion = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaccion);
    }
}

export default CreateAccionesPantallaService;