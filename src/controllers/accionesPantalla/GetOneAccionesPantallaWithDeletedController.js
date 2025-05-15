import GetOneAccionesPantallaService from '../../services/accionesPantalla/GetOneAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";


class GetOneAccionesPantallaWithDeletedController{


    constructor(service = new GetOneAccionesPantallaService()){
        this.service = service;
    }
    
    getOne = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.getOne(id, false)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetOneAccionesPantallaWithDeletedController;
