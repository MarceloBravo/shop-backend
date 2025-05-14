import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';
import validaDatos from './validaDatos.js';

class CreateAccionesPantallaService{

    constructor(repository = new AccionesPantallaRepository()){
        this.repository = repository;
    }

    createAccionesPantallaService = async (data, transaccion = null) => {
        validaDatos(data);
        return await this.repository.createAccionesPantalla(data, transaccion);
    }
}

export default CreateAccionesPantallaService;