import GetAllAccionesPantallaService from '../../services/accionesPantalla/GetAllAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

class GetAllAccionesPantallaWithDeletedController{
    
    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetAllAccionesPantallaService(repository);
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

