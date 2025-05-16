import GetByIdCategoriaService from "../../services/Categoria/GetByIdCategoriaService.js";
import { handleError } from "../../shared/functions.js";

class GetByIdCategoriaController{
    constructor(service = new GetByIdCategoriaService()) {
        this.service = service;
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.service.getById(id);
            res.json(data);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }       
}

export default GetByIdCategoriaController;