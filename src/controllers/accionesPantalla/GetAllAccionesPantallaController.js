import GetAllAccionesPantallaService from '../../services/accionesPantalla/GetAllAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

class GetAllAccionesPantallaController{
    
    constructor(service = new GetAllAccionesPantallaService()){
        this.service = service;
    }


    execute = async (req, res) => {
        try{
            const data = await this.service.execute();
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllAccionesPantallaController;

