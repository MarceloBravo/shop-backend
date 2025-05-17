import GetByIdColorService from '../../services/color/GetByIdColorService.js';
import { handleError } from "../../shared/functions.js";

class GetColorWithDeletedController{
    constructor(service = new GetByIdColorService()){
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.execute(id, false);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetColorWithDeletedController;
