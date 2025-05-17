import GetAllCategoriaService from '../../services/Categoria/GetAllCategoriaService.js';
import { handleError } from "../../shared/functions.js";

class GetAllCategoriaController {
    constructor(service = new GetAllCategoriaService()) {
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const data = await this.service.execute();
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }

}   

export default GetAllCategoriaController;