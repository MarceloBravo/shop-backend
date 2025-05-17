import GetByIdRolService from "../../services/Rol/GetByIdRolService.js";
import { handleError } from "../../shared/functions.js";

class GetByIdRolWithDeletedController{

    constructor(service = new GetByIdRolService()){
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdRolWithDeletedController;