import SoftDeleteAtributoService from "../../services/atributo/SoftDeleteAtributoService.js";
import { handleError } from "../../shared/functions.js";

class SoftDeleteAtributoController{
    constructor(service = new SoftDeleteAtributoService){
        this.service = service;
    }

    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.softDelete(id);
            const resp = {code: result, mensaje : result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default SoftDeleteAtributoController;