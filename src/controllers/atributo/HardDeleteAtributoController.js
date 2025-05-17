import HardDeleteAtributoService from '../../services/atributo/HardDeleteAtributoService.js';
import { handleError } from "../../shared/functions.js";

class HardDeleteAtributoController{
    constructor(service = new HardDeleteAtributoService){
        this.service = service;
    }

    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result= await this.service.hardDelete(id);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default HardDeleteAtributoController;