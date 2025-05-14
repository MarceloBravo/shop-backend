import GetAccionesPantallaService from '../../services/accionesPantalla/GetAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";


class GetAccionesPantallaController{


    constructor(service = new GetAccionesPantallaService()){
        this.service = service;
    }
    
    get = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.getAccionesPantallaService(id)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAccionesPantallaController;
