import UpdateColorService from "../../services/color/UpdateColorService.js";
import { handleError } from "../../shared/functions.js";

class UpdateColorController{
    constructor(service = new UpdateColorService()){
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({color: result.color, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        } catch (error) {
            const err = handleError(error);
            res.status(err.code).json(err);
        }
    }   
}

export default UpdateColorController;