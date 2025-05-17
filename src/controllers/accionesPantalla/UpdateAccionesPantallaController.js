import UpdateAccionesPantallaService from "../../services/accionesPantalla/UpdateAccionesPantallaService.js";
import { handleError } from "../../shared/functions.js";

class UpdateAccionesPantallaController{

    constructor(service = new UpdateAccionesPantallaService()){
        this.service = service;
    }

    
    execute = async (req, res) => {
        try{
            const { id } = req.params;
            const result = await this.service.execute(id, req.body);
            res.json({data: result.data, mensaje: `Registro ${result.created ? 'creado' : 'actualizado'} exitosamente.`})
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default UpdateAccionesPantallaController;