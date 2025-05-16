import GetAllCategoriaService from '../../services/Categoria/GetAllCategoriaService.js';
import { handleError } from "../../shared/functions.js";

class GetAllCategoriaWithDeletedController {
    constructor(service = new GetAllCategoriaService()) {
        this.service = service;
    }

    getAll = async (req, res) => {
        try {
            const data = await this.service.getAll(false);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }

}   

export default GetAllCategoriaWithDeletedController;