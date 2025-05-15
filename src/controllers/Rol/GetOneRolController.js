import GetOneRolService from "../../services/Rol/GetOneRolService.js";
import { handleError } from "../../shared/functions.js";

class GetOneRolController{

    constructor(service = new GetOneRolService()){
        this.service = service;
    }

    getOne = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.getOne(id);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetOneRolController;