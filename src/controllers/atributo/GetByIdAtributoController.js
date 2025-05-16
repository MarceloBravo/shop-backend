import GetByIdAtributoService from '../../services/atributo/GetByIdAtributoService.js';
import { handleError } from "../../shared/functions.js";

class GetByIdAtributoController{    

    constructor(service = new GetByIdAtributoService){
        this.service = service;
    }

    getById = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.getById(id)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdAtributoController;
