import SoftDeleteCategoriaService from "../../services/Categoria/SoftDeleteCategoriaService.js";
import { handleError } from "../../shared/functions.js";


class SoftDeleteCategoriaController{

    constructor(service = new SoftDeleteCategoriaService()) {
        this.service = service;
    }

    execute = async (req, res) => {
        try {
            const { id } = req.params;
            const  result  = await this.service.execute(id);
            const resp = {code: result, mensaje : result ? 'El registro ha sido borrado exitosamente.' : 'El registro no púdo ser borrado o registro inexistente' };
            res.json(resp);
        }catch(e){
            res.status(500).json({error: e.message});
        }
    }   
}

export default SoftDeleteCategoriaController;