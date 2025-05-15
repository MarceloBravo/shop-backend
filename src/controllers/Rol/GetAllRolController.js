import GetAllRolService from '../../services/Rol/GetAllRolService.js';
import { handleError } from "../../shared/functions.js";

class GetAllRolController{

    constructor(service = new GetAllRolService()){
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const data = await this.service.getAll();
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllRolController;