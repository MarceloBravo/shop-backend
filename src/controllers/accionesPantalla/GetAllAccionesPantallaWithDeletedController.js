import AccionesPantallaRepository from '../../repositories/AccionesPantallaRepository.js';
import GetAllAccionesPantallaService from '../../services/accionesPantalla/GetAllAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

class GetAllAccionesPantallaWithDeletedController{
    
    constructor(reppository = new AccionesPantallaRepository()){
        this.service = new GetAllAccionesPantallaService(reppository);
    }


    execute = async (req, res) => {
        try{
            const data = await this.service.execute(false);
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllAccionesPantallaWithDeletedController;

