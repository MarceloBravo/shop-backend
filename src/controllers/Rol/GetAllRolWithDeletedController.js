import GetAllRolService from '../../services/Rol/GetAllRolService.js';
import { handleError } from "../../shared/functions.js";

class GetAllRolWithDeletedController{

    constructor(service = new GetAllRolService()){
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const data = await this.service.execute(false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetAllRolWithDeletedController;