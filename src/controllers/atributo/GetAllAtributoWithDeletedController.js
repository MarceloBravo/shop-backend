import GetAllAtributoService from '../../services/atributo/GetAllAtributoService.js';
import { handleError } from "../../shared/functions.js";

class GetAllAtributoWithDeletedController{
    constructor(service = new GetAllAtributoService){
        this.service = service;
    }

    getAll = async (req, res) => {
        try{
            const data = await this.service.getAll(false);
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllAtributoWithDeletedController;

