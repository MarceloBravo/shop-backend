import GetByIdAccionesPantallaService from '../../services/accionesPantalla/GetByIdAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";


class GetByIdAccionesPantallaController{


    constructor(service = new GetByIdAccionesPantallaService()){
        this.service = service;
    }
    
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.execute(id)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdAccionesPantallaController;
