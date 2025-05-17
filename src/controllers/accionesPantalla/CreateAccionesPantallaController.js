import CreateAccionesPantallaService from "../../services/accionesPantalla/CreateAccionesPantallaService.js";
import { handleError } from "../../shared/functions.js";

class CreateAccionesPantallaController{

    constructor(service = new CreateAccionesPantallaService()){
        this.service = service;
    }

    execute = async (req, res) => {
        try{        
            const data = await this.service.execute(req.body);
            res.json({data, mensaje: 'El registro ha sido creado exitosamente.'});
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default CreateAccionesPantallaController;