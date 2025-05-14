import UpdateRolService from "../../services/Rol/UpdateRolService.js";
import { handleError } from "../../shared/functions.js";

class UpdateRolController{

    constructor(service = new UpdateRolService() ){
        this.service = service;
    }


    updateRol = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.service.updateRol(id, req.body);
            res.json({color: result.color, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateRolController;