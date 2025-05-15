import GetAllColorService from '../../services/color/GetAllColorsService.js';
import { handleError } from "../../shared/functions.js";

class GetAllColorWithDeletedController{
    constructor(service = new GetAllColorService()){
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const data = await this.service.getAll(false);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }   
}


export default GetAllColorWithDeletedController;

