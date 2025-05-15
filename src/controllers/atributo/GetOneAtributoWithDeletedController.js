import GetOneAtributoService from '../../services/atributo/GetOneAtributoService.js';
import { handleError } from "../../shared/functions.js";

class GetOneAtributoWithDeletedController{    

    constructor(service = new GetOneAtributoService){
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

export default GetOneAtributoWithDeletedController;
