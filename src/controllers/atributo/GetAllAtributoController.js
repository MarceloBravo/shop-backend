import GetAllAtributoService from '../../services/atributo/GetAllAtributoService.js';
import { handleError } from "../../shared/functions.js";

class GetAllAtributoController{
    constructor(service = new GetAllAtributoService){
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

export default GetAllAtributoController;

