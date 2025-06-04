import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';
import GetByIdAccionesPantallaService from '../../services/accionesPantalla/GetByIdAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";


class GetByIdAccionesPantallaWithDeletedController{


    constructor(repository = new AccionesPantallaRepository()){
        this.service = new GetByIdAccionesPantallaService(repository);
    }
    
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.execute(id, false)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdAccionesPantallaWithDeletedController;
