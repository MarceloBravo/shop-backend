import DeleteAccionesPantallaService from '../../services/accionesPantalla/DeleteAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";

class DeleteAccionesPantallaController{

    constructor(service = new DeleteAccionesPantallaService()){
        this.service = service;
    }
    
    delete = async (req, res) => {
        try{
            const {id, result } = await this.service.deleteAccionesPantallaService(req.params);
            const mensaje = result ? 'El registro ha sido eliminado exitosamente.' : 'El registro no púdo ser eliminado o registro inexistente';  
            res.json({ id, code: result ? 200 : 500, mensaje });
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default DeleteAccionesPantallaController;