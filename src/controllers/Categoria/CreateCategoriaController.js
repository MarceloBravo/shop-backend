import CreateCategoriaService from '../../services/Categoria/CreateCategoriaService.js';
import { handleError } from "../../shared/functions.js";

class CreateCategoriaController{
    constructor(service = new CreateCategoriaService()) {
        this.service = service;
    }

    create = async (req, res) => {
        try {
            const data = await this.service.create(req.body);
            res.json({ data, mensaje: 'La categoría ha sido creada exitosamente.' });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}   

export default CreateCategoriaController;