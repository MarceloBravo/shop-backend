import CreateColorService from "../../services/color/CreateColorService.js";
import { handleError } from "../../shared/functions.js";

class CreateColorController{
    constructor(service = new CreateColorService()){
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const {nombre, valor} = req.body;
            const resp = await this.service.execute({nombre, valor});
            res.json({data: resp, mensaje: 'El registro ha sido creado exitosamente.'});
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }
}   

export default CreateColorController;