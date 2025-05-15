import GetColorService from '../../services/color/GetColorService.js';
import { handleError } from "../../shared/functions.js";

class GetColorWithDeletedController{
    constructor(service = new GetColorService()){
        this.service = service;
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.getById(id, false);
            res.json(data);
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}

export default GetColorWithDeletedController;
