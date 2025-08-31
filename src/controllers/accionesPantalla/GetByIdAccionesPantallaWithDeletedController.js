import GetByIdAccionesPantallaService from '../../services/accionesPantalla/GetByIdAccionesPantallaService.js';
import { handleError } from "../../shared/functions.js";


class GetByIdAccionesPantallaWithDeletedController{


    constructor(repository = null) {
        if(!repository){
            const error = new Error('No se ha recibido un repositorio');
            error.code = 400;
            throw error;
        }
        this.service = new GetByIdAccionesPantallaService(repository);
    }
    
    execute = async (req, res) => {
        try{
            const { id } = req.params
            const data = await this.service.execute(id, false)
            res.json(data);
        }catch(e){
            const err = handleError(e);
            res.status(err.code).json(err);
        }
    }
}

export default GetByIdAccionesPantallaWithDeletedController;
