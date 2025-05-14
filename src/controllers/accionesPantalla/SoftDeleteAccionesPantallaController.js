import SoftDeleteAccionesPantallaService from "../../services/accionesPantalla/SoftDeleteAccionesPantallaService.js";
import { handleError } from "../../shared/functions.js";

class SoftDeleteAccionesPantallaController {

    constructor(service = new SoftDeleteAccionesPantallaService()){
        this.service = service;
    }
    

    softDelete = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.softDeleteAccionesPantallaService(id);
            const resp = {code: result, mensaje : result === 200 ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteAccionesPantallaController;