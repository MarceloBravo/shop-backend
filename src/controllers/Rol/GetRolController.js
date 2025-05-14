import GetRolService from "../../services/Rol/GetRolService.js";
import { handleError } from "../../shared/functions.js";

class GetRolController{

    constructor(service = new GetRolService()){
        this.service = service;
    }

    getRol = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.getRol(id);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetRolController;