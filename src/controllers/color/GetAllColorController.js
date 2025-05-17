import GetAllColorService from '../../services/color/GetAllColorsService.js';
import { handleError } from "../../shared/functions.js";

class GetAllColorController{
    constructor(service = new GetAllColorService()){
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }   
}


export default GetAllColorController;

