import SoftDeleteRolService from "../../services/Rol/SoftDeleteRolService.js";
import { handleError } from "../../shared/functions.js";

class SoftDeleteRolController{

    constructor(service = new SoftDeleteRolService()){
        this.service = service;
    }

    softDelete = async (req, res) => {
        try {
            const { id } = req.params;
            const  result  = await this.service.softDelete(id);
            const resp = {code: result, mensaje : result == 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        } catch (e) {
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteRolController;