import CreateColorService from "../../services/color/CreateColorService.js";
import ColorRepository from "../../repositories/ColorRepository.js";
import { handleError } from "../../shared/functions.js";

class CreateColorController {
    constructor(repository = new ColorRepository()) {
        this.service = new CreateColorService(repository);
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